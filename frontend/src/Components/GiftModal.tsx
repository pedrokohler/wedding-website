import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/esm/Stack";
import { Copy } from "react-bootstrap-icons";
import { QrCodePix } from "qrcode-pix";

import { useCopyToClipboard } from "usehooks-ts";
import { IconButton } from "./IconButton";
import { convertPriceInCentsToPriceString } from "../utils/price";
import { TextArea } from "./TextArea";

const bitcoinAddress = "bc1q6zu2cruhn4xaadgtfsjv4d6tfzjgqfuzp86wyd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GiftModal({ onHide, show, product }: any) {
  const [deliveryAddress] = useState(
    "Av. Cristóvão Colombo, 157, apto. 904, Savassi - Belo Horizonte - 30140-150"
  );
  const [, copy] = useCopyToClipboard();
  const [pixMessage, setPixMessage] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [pixString, setPixString] = useState("");
  const handleClose = () => {
    setPixMessage("");
    onHide();
  };

  useEffect(() => {
    if (!product) {
      return;
    }

    const generateQRCode = async () => {
      const transactionId = product.name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 25);
      const pix = QrCodePix({
        version: "01",
        key: "11807301605",
        name: "PEDRO HENRIQUE KOHLER MAR",
        city: "BELO HORIZONTE",
        transactionId,
        message: pixMessage,
        value: product.priceInCents / 100,
      });
      const pixString = pix.payload();
      const qrCodeBase64 = await pix.base64();
      setQRCode(qrCodeBase64);
      setPixString(pixString);
    };
    generateQRCode();
  }, [pixMessage, product]);

  if (!product || !qrCode) {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Um erro ocorreu.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Não foi possível mostrar o produto</h4>
          <p>Por gentileza, avise os noivos sobre o erro no site:</p>
          <p>produto: {JSON.stringify(product ?? {})}</p>
          <p>qrCode: {qrCode}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Presentear os noivos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{product.name}</h4>
        <div style={{ fontSize: "0.65em", margin: "0 0 16px 0" }}>
          {convertPriceInCentsToPriceString(product.priceInCents)}
        </div>
        <div>
          Você pode optar por uma das opções abaixo para adquirir este presente:
        </div>
        <Stack
          gap={4}
          style={{
            margin: "16px 0",
          }}
        >
          {[
            {
              shouldRender:
                product.allowUnrestrictedPix || product.priceInCents,
              component: (index: number) => (
                <>
                  <h5>
                    {index} - Fazer um <b>PIX</b>:
                  </h5>
                  <div>
                    Escaneie o QR Code abaixo para enviar o valor diretamente
                    aos noivos:
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <img src={qrCode} />
                    <TextArea
                      id="pixMessage"
                      placeholder="Digite aqui a sua mensagem PIX antes de escanear o QR code"
                      value={pixMessage}
                      onChange={(e) =>
                        setPixMessage(e.target.value.slice(0, 60))
                      }
                    />
                  </div>
                  <div>Ou copie o código pix a seguir: </div>
                  <div style={{ textWrap: "wrap", overflowWrap: "break-word" }}>
                    <span style={{ fontSize: "0.65em" }}>{pixString}</span>
                    <IconButton onClick={() => copy(pixString)} icon={Copy} />
                  </div>
                </>
              ),
            },
            {
              shouldRender: product.productUrl,
              component: (index: number) => (
                <>
                  <h5>
                    {index} - Comprar o item pela nossa lista da <b>Amazon</b>:
                  </h5>
                  <div>
                    O endereço de entrega dos noivos estará disponível no
                    checkout ao comprar por{" "}
                    <a href={product.productUrl} target="_blank">
                      este link
                    </a>
                    . Não se esqueça de se certificar que está enviando para o
                    endereço correto antes de finalizar a compra.
                  </div>
                  <div>
                    Caso o endereço não apareça, você pode usar o seguinte
                    endereço:{" "}
                  </div>
                  <div style={{ textWrap: "wrap", overflowWrap: "break-word" }}>
                    <span style={{ fontSize: "0.65em" }}>
                      {deliveryAddress}
                    </span>
                    <IconButton
                      onClick={() => copy(deliveryAddress)}
                      icon={Copy}
                    />
                  </div>
                </>
              ),
            },
            {
              shouldRender: true,
              component: (index: number) => (
                <>
                  <h5>
                    {index} - Enviar <b>Bitcoin</b> para a carteira dos noivos:
                  </h5>
                  <div>
                    <b style={{ textWrap: "wrap", overflowWrap: "break-word" }}>
                      <span style={{ fontSize: "0.65em" }}>
                        {bitcoinAddress}
                      </span>
                    </b>
                    <IconButton
                      onClick={() => copy(bitcoinAddress)}
                      icon={Copy}
                    />
                  </div>
                </>
              ),
            },
          ]
            .filter(({ shouldRender }) => shouldRender)
            .map(({ component }, index) => component(index + 1))}
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}
