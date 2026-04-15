import type { StaticImageData } from "next/image";

import drAkshay from "../../../lib/editorial_board/dr-akshay.jpeg";
import drAlkaPandey from "../../../lib/editorial_board/dr-alka-pandey.png";
import drAnnu from "../../../lib/editorial_board/dr_annu.jpeg";
import drAishwarya from "../../../lib/editorial_board/dr_aishwarya.jpeg";
import drLuxita from "../../../lib/editorial_board/dr_luxita.jpeg";
import drNeha from "../../../lib/editorial_board/dr_neha.jpeg";
import drPoojaRana from "../../../lib/editorial_board/Dr_pooja_rana.jpeg";
import drPriyanka from "../../../lib/editorial_board/dr_priyanka.jpeg";
import drSanjay from "../../../lib/editorial_board/dr_sanjay.jpeg";
import profDevara from "../../../lib/editorial_board/prof-devara.jpeg";
import ramVinayTiwari from "../../../lib/founders/ram-vinay-tiwari.jpeg";
import vishalAnand from "../../../lib/founders/vishal-anand.jpeg";

const editorialImageMap: Record<string, StaticImageData> = {
  "/editorial-board/dr-akshay.jpeg": drAkshay,
  "/editorial-board/dr-alka-pandey.png": drAlkaPandey,
  "/editorial-board/dr_annu.jpeg": drAnnu,
  "/editorial-board/dr_aishwarya.jpeg": drAishwarya,
  "/editorial-board/dr_luxita.jpeg": drLuxita,
  "/editorial-board/dr_neha.jpeg": drNeha,
  "/editorial-board/Dr_pooja_rana.jpeg": drPoojaRana,
  "/editorial-board/dr_priyanka.jpeg": drPriyanka,
  "/editorial-board/dr_sanjay.jpeg": drSanjay,
  "/editorial-board/prof-devara.jpeg": profDevara,
};

const founderImageMap: Record<string, StaticImageData> = {
  "/aboutusimages/ram-vinay-tiwari.jpeg": ramVinayTiwari,
  "/aboutusimages/vishal-anand.jpeg": vishalAnand,
};

export function getEditorialImage(src?: string | null): StaticImageData | null {
  if (!src) return null;
  return editorialImageMap[src] || null;
}

export function getFounderImage(src?: string | null): StaticImageData | null {
  if (!src) return null;
  return founderImageMap[src] || null;
}
