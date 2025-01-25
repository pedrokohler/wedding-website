import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "usehooks-ts";

import GiftGrid from "./GiftGrid";
import { GiftCardProduct } from "./GiftCard";

const products: GiftCardProduct[] = [
  {
    name: "Roupa de cama",
    description: "Precisamos vestir a cama, senão ela irá passar frio.",
    priceInCents: 12345,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/724f/1222/2212d0d2c4fdbb0492a69d37bc0d2ecc?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XxxmW5miG4pphZKutRL9bloso~~5FjP3cyKD5Wt6dqID5AIo3JAsyhXlA4NFfTklmpGB7sDFxBPluC~Gh1Is1Co5rmrrwjzMpdOTr2r-u4H4blpjZgqDaZMQh5xeoI1lga6iAXfKw674yWvtKxqM00K9lQUd2dFkNBKp-Tc9LS~hTGV0Ep6zeCC1AeWluTR4Jf5HWKsjcLkCisLDZYmc1Ocib8cE5sXUVmeG6VayDJGOP00G-hLy-mwPgCYtSfLqaW4LcpFTcCctd87KyF-EmhEK0CtW5tMB01qDsBuFQt01vmDU2rij-HqCdpqxKsZQauOYuQ2DJ4jZrihaVEtymg__",
  },
  {
    name: "Jogo de pratos",
    description: "Quem não gosta de jogar esse jogo divertido?",
    priceInCents: 12345,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/19b0/8c65/c13cd8a72e7b8565a22085914216c443?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yv3wfVq9OFj8Y~uvQc0PDibEqwt2U3YxxYmMMZGUszz1TCY3cpqpxVsLDfiI-xw3tU~E9e1SJtdLQ2K0UpjdMob~C0es1GuDLPP4ZgTAGID7iS59QqJlfjS0qZ60Gf4MDD0qvKp5mw4ZhrH4hsaZxnVwUuWNnyE4Fj5g8JT6U7GDuFb0f5LMXhiFjafLhGj3tBMWjYSG8x24HDfamzSOmPx192676I2t~FMrrKPELPCOFcO2Nmn6w3no9~wDeTJ67g7lwU6xRM5EnmYXXv5bNgcdZlBHPdof6-gHZalABlf~UZoPf~oZ8wINOjohbNDpqLJ9zb1ndbZcpPwUJHM2IQ__",
  },
  {
    name: "Vinho Caro",
    description: "Caro meu",
    priceInCents: 12345,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/27b5/3c9a/75d463aa1c3fe0b6d490023c1f71452d?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Tw94FOTho34xDhHX6VKXvgIbQDMCac4qhxWDfMXMEICPTakB7HqPMQyWl8C3fA6NrbA7vwmhYroE6BAzUpj7DH8z5Vgt80O2-vTzGpmxSSUCiBqr9~enr~hXzJ3osD5xJa~Rbvwag4nqasrP3gF3kZEjD5tKxHrg84hL4r7A3HmdWU3uIKLYQydRw1gzuxTeUfbeIFHQJXcYYmUh-62Ue3wtIctgCOGuXeA313c8H0vJBSABuhZyN6Jp6l~wpNduQVKg6xii~j~GZwgVdtZKWOqOyej31p3hWYBYY4~gVB5~pKynyncySEZ42FT7efs3Y9K9lb8tkktQDahEjhf6nA__",
  },
  {
    name: "Roupa de cama 2",
    description: "hello world",
    priceInCents: 12345,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/724f/1222/2212d0d2c4fdbb0492a69d37bc0d2ecc?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XxxmW5miG4pphZKutRL9bloso~~5FjP3cyKD5Wt6dqID5AIo3JAsyhXlA4NFfTklmpGB7sDFxBPluC~Gh1Is1Co5rmrrwjzMpdOTr2r-u4H4blpjZgqDaZMQh5xeoI1lga6iAXfKw674yWvtKxqM00K9lQUd2dFkNBKp-Tc9LS~hTGV0Ep6zeCC1AeWluTR4Jf5HWKsjcLkCisLDZYmc1Ocib8cE5sXUVmeG6VayDJGOP00G-hLy-mwPgCYtSfLqaW4LcpFTcCctd87KyF-EmhEK0CtW5tMB01qDsBuFQt01vmDU2rij-HqCdpqxKsZQauOYuQ2DJ4jZrihaVEtymg__",
  },
  {
    name: "Jogo de pratos 2",
    description: "hello world",
    priceInCents: 12345,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/19b0/8c65/c13cd8a72e7b8565a22085914216c443?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yv3wfVq9OFj8Y~uvQc0PDibEqwt2U3YxxYmMMZGUszz1TCY3cpqpxVsLDfiI-xw3tU~E9e1SJtdLQ2K0UpjdMob~C0es1GuDLPP4ZgTAGID7iS59QqJlfjS0qZ60Gf4MDD0qvKp5mw4ZhrH4hsaZxnVwUuWNnyE4Fj5g8JT6U7GDuFb0f5LMXhiFjafLhGj3tBMWjYSG8x24HDfamzSOmPx192676I2t~FMrrKPELPCOFcO2Nmn6w3no9~wDeTJ67g7lwU6xRM5EnmYXXv5bNgcdZlBHPdof6-gHZalABlf~UZoPf~oZ8wINOjohbNDpqLJ9zb1ndbZcpPwUJHM2IQ__",
  },
  {
    name: "Vinho Caro 2",
    description: "hello world",
    priceInCents: 12345,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/27b5/3c9a/75d463aa1c3fe0b6d490023c1f71452d?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Tw94FOTho34xDhHX6VKXvgIbQDMCac4qhxWDfMXMEICPTakB7HqPMQyWl8C3fA6NrbA7vwmhYroE6BAzUpj7DH8z5Vgt80O2-vTzGpmxSSUCiBqr9~enr~hXzJ3osD5xJa~Rbvwag4nqasrP3gF3kZEjD5tKxHrg84hL4r7A3HmdWU3uIKLYQydRw1gzuxTeUfbeIFHQJXcYYmUh-62Ue3wtIctgCOGuXeA313c8H0vJBSABuhZyN6Jp6l~wpNduQVKg6xii~j~GZwgVdtZKWOqOyej31p3hWYBYY4~gVB5~pKynyncySEZ42FT7efs3Y9K9lb8tkktQDahEjhf6nA__",
  },
];

export const GiftsList = () => {
  const isAbove500w = useMediaQuery("(min-width: 500px)");
  const isAbove750w = useMediaQuery("(min-width: 750px)");
  const isAbove1000w = useMediaQuery("(min-width: 1000px)");

  return (
    <Stack
      gap={5}
      style={{
        height: "fit-content",
        width: "100%",
        padding: isAbove1000w
          ? "32px 196px"
          : isAbove750w
          ? "32px 154px"
          : isAbove500w
          ? "32px 128px"
          : "32px 64px",
      }}
    >
      <h2 className="text-gold">LISTA DE PRESENTES</h2>
      <div
        style={{
          color: "black",
          maxWidth: "80%",
          alignSelf: "center",
        }}
      >
        Donec dignissim et libero sed congue. Cras sit amet vestibulum diam.
        Etiam ut varius turpis. Proin luctus efficitur mi, nec sollicitudin
        tellus tincidunt sed.
      </div>
      <GiftGrid products={products} />
    </Stack>
  );
};
