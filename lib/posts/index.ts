import type { StaticPost } from "@/lib/blog";
import { post as reliableMoversMarietta } from "./how-to-find-reliable-movers-marietta-ga";
import { post as apartmentChecklist } from "./apartment-moving-checklist-atlanta";
import { post as smallOfficeMove } from "./small-office-move-checklist-atlanta";
import { post as seniorChecklist } from "./senior-moving-checklist-atlanta";
import { post as interstateChecklist } from "./moving-out-of-georgia-interstate-checklist";
import { post as storageGap } from "./moving-with-a-storage-gap-atlanta";
import { post as howMoversPrice } from "./how-movers-price-a-move-atlanta";

// One import per post file. Order does not matter; the blog sorts by date.
export const STATIC_POSTS: StaticPost[] = [
  reliableMoversMarietta,
  apartmentChecklist,
  smallOfficeMove,
  seniorChecklist,
  interstateChecklist,
  storageGap,
  howMoversPrice,
];
