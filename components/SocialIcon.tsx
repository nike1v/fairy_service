import type { NextPage } from "next";
import Image from "next/image";

interface Props {
	imagePath: string;
	linkUrl: string;
	imgAlt: string;
  width: number;
  height: number;
}

const SocialIcon: NextPage<Props> = ({ imagePath, linkUrl, imgAlt, width, height }) => {
  return (
    <a href={linkUrl} target="_blank" rel="noreferrer">
      <Image src={imagePath} alt={imgAlt} width={width} height={height} ></Image>
    </a>
  );
};

export default SocialIcon;