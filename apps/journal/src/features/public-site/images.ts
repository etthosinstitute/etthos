import type { StaticImageData } from "next/image";

 import drAkshay from "../../assets/editorial_board/dr-akshay.jpeg";
import drAlkaPandey from "../../assets/editorial_board/dr-alka-pandey.png";
import drAnnu from "../../assets/editorial_board/dr_annu.jpeg";
import drAishwarya from "../../assets/editorial_board/dr_aishwarya.jpeg";
import drLuxita from "../../assets/editorial_board/dr_luxita.jpeg";
import drNeha from "../../assets/editorial_board/dr_neha.jpeg";
import drPoojaRana from "../../assets/editorial_board/Dr_pooja_rana.jpeg";
import drPriyanka from "../../assets/editorial_board/dr_priyanka.jpeg";
import drSanjay from "../../assets/editorial_board/dr_sanjay.jpeg";
import drVikas from "../../assets/editorial_board/dr_vikas.jpeg";
import profDevara from "../../assets/editorial_board/prof-devara.jpeg";
import drPallavi from "../../assets/editorial_board/Profile pic - Pallavi.jpg";
import drTanu from "../../assets/editorial_board/dr.tanu.jpeg";
import drRavinder from "../../assets/editorial_board/Dr.Ravinder Kumar.jpeg";
import ramVinayTiwari from "../../assets/founders/ram-vinay-tiwari.jpeg";
import vishalAnand from "../../assets/founders/vishal-anand.jpeg";
import { EDITORIAL_IMAGE_OVERRIDES } from "./static-config";
const editorialImageMap: Record<string, StaticImageData> = {
  "/editorial-board/dr-akshay.jpeg": drAkshay,
  "/editorial-board/dr-alka-pandey.png": drAlkaPandey,
  "/editorial-board/dr_annu.jpeg": drAnnu,
  "/editorial-board/dr_aishwarya.jpeg": drAishwarya,
  "/editorial-board/dr_luxita.jpeg": drLuxita,
  "/editorial-board/dr_neha.jpeg": drNeha,
  "/editorial-board/dr_pooja_rana.jpeg": drPoojaRana,
  "/editorial-board/Dr_pooja_rana.jpeg": drPoojaRana,
  "/editorial-board/dr_priyanka.jpeg": drPriyanka,
  "/editorial-board/dr_sanjay.jpeg": drSanjay,
  "/editorial-board/dr_vikas.jpeg": drVikas,
  "/editorial-board/prof-devara.jpeg": profDevara,
  "/editorial-board/dr_pallavi.jpeg": drPallavi,
  "/editorial-board/dr_tanu.jpeg": drTanu,
  "/editorial-board/dr_ravinder.jpeg": drRavinder,
  "/editorial-board/Dr.Ravinder Kumar.jpeg": drRavinder,
};
const founderImageMap: Record<string, StaticImageData> = {
  "/aboutusimages/ram-vinay-tiwari.jpeg": ramVinayTiwari,
  "/aboutusimages/vishal-anand.jpeg": vishalAnand,
};

export function getEditorialImage(src?: string | null, memberId?: string | null): StaticImageData | null {
  const resolvedSrc = src || (memberId ? EDITORIAL_IMAGE_OVERRIDES[memberId] : null);
  if (!resolvedSrc) return null;
  return editorialImageMap[resolvedSrc] || null;
}

export function getFounderImage(src?: string | null): StaticImageData | null {
  if (!src) return null;
  return founderImageMap[src] || null;
}
