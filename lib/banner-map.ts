import type { ComponentType } from "react"

import CryptoTrackBanner from "@/components/banners/CryptoTrackBanner"
import DashBoardBanner from "@/components/banners/DashBoardBanner"
import DevLogBanner from "@/components/banners/DevLogBanner"
import CreatorStoreBanner from "@/components/banners/CreatorStoreBanner"
import StreamHubBanner from "@/components/banners/StreamHubBanner"
import StudyVaultBanner from "@/components/banners/StudyVaultBanner"
import TodoBanner from "@/components/banners/TodoBanner"
import TranslatorBanner from "@/components/banners/TranslatorBanner"
import EarthPlusBanner from "@/components/banners/EarthPlusBanner"
import SorenLabBanner from "@/components/banners/SorenLabBanner"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BANNER_MAP: Record<string, ComponentType<any>> = {
  "CryptoTracker":     CryptoTrackBanner,
  "Dashboard App":     DashBoardBanner,
  "Blogging Platform": DevLogBanner,
  "Creator Tools":     CreatorStoreBanner,
  "Anakonis":          StreamHubBanner,
  "GrowthVault":       StudyVaultBanner,
  "Todo List":         TodoBanner,
  "Translator":        TranslatorBanner,
  "Soren Lab":         SorenLabBanner,
  "Earth Plus":        EarthPlusBanner,
}
