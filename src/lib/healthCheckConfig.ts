/**
 * 健康寿命チェック MVP の設定
 *
 * 公式LINEからの流入を前提とし、Googleログイン等の外部認証は使いません。
 * LINE内ブラウザ・Instagram内ブラウザ・Safari・Chrome ですぐに開けるよう、
 * /health-check 配下はログイン不要で完結させます。
 */

/** 認証不要の公開ルート（middleware・デプロイ設定の参考用） */
export const HEALTH_CHECK_PUBLIC_PATH_PREFIX = "/health-check";

/** localStorage キー（将来 Firebase / Supabase 移行時も名前空間を統一） */
export const HEALTH_CHECK_STORAGE_KEY = "zutto-petto:health-check";
export const HEALTH_CHECK_DRAFT_KEY = "zutto-petto:health-check-draft";
export const HEALTH_CHECK_UPDATED_EVENT = "zutto-petto:health-check-updated";

/**
 * LINE公式アカウントURL（後で差し替え）
 * 環境変数 NEXT_PUBLIC_LINE_OFFICIAL_URL で上書き可能
 */
export const LINE_OFFICIAL_URL =
  process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL ?? "https://line.me/R/ti/p/@placeholder";
