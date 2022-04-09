import { atom } from "recoil";

export const isDarkAtom = atom({
    key: "isDarkMode",
    default: false,
});