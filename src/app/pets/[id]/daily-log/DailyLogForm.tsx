"use client";

import { useMemo, useState } from "react";
import { type DailyLog } from "@/lib/mockData";

type DailyLogFormProps = {
  petId: string;
  initialLogs: DailyLog[];
};

const today = "2026-05-15";

export function DailyLogForm({ petId, initialLogs }: DailyLogFormProps) {
  const [logs, setLogs] = useState(initialLogs);
  const [savedMessage, setSavedMessage] = useState("");
  const [form, setForm] = useState({
    walkMinutes: "30",
    mealQuality: "よい",
    weight: initialLogs[0]?.weight.toString() ?? "5.0",
    energyLevel: "元気",
    stoolCondition: "良好",
    hospitalVisit: "false",
    memo: ""
  });

  const recentLogs = useMemo(() => logs.slice(0, 7), [logs]);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newLog: DailyLog = {
      date: today,
      petId,
      walkMinutes: Number(form.walkMinutes),
      mealQuality: form.mealQuality,
      weight: Number(form.weight),
      energyLevel: form.energyLevel,
      stoolCondition: form.stoolCondition,
      hospitalVisit: form.hospitalVisit === "true",
      memo: form.memo || "今日の記録を保存しました。"
    };

    setLogs((current) => [newLog, ...current].slice(0, 7));
    setForm((current) => ({ ...current, memo: "" }));
    setSavedMessage("今日の記録が反映されました。小さな変化を続けて見守りましょう。");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] bg-white p-6 shadow-soft">
        <div>
          <p className="text-sm font-semibold text-leaf">1分で記録</p>
          <h2 className="mt-1 text-2xl font-bold text-ink">今日の健康記録</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">完璧に入力しなくても大丈夫です。いつもと違ったことだけでも残しましょう。</p>
        </div>
        {savedMessage ? <p className="rounded-2xl bg-mint px-4 py-3 text-sm font-bold text-leaf">{savedMessage}</p> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold text-slate-600">
            散歩・遊び時間（分）
            <input
              value={form.walkMinutes}
              onChange={(event) => updateField("walkMinutes", event.target.value)}
              type="number"
              min="0"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-leaf"
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-600">
            体重（kg）
            <input
              value={form.weight}
              onChange={(event) => updateField("weight", event.target.value)}
              type="number"
              min="0"
              step="0.1"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-leaf"
            />
          </label>
        </div>
        <ChoiceGroup
          label="食事の質"
          value={form.mealQuality}
          onChange={(value) => updateField("mealQuality", value)}
          options={["よい", "ふつう", "少し残した", "食欲低め"]}
        />
        <ChoiceGroup
          label="元気度"
          value={form.energyLevel}
          onChange={(value) => updateField("energyLevel", value)}
          options={["とても元気", "元気", "ふつう", "少し低め", "低め"]}
        />
        <ChoiceGroup
          label="便の状態"
          value={form.stoolCondition}
          onChange={(value) => updateField("stoolCondition", value)}
          options={["良好", "やや硬め", "やわらかめ", "気になる"]}
        />
        <ChoiceGroup
          label="通院の有無"
          value={form.hospitalVisit}
          onChange={(value) => updateField("hospitalVisit", value)}
          options={["false", "true"]}
          labels={{ false: "なし", true: "あり" }}
        />
        <label className="space-y-2 text-sm font-semibold text-slate-600">
          メモ
          <textarea
            value={form.memo}
            onChange={(event) => updateField("memo", event.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-leaf"
            placeholder="食欲、便、睡眠、気になったことなど"
          />
        </label>
        <button type="submit" className="w-full rounded-full bg-leaf px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
          保存する
        </button>
        <p className="text-xs text-slate-500">保存内容はこの画面のローカル state にだけ反映されます。</p>
      </form>

      <section className="space-y-4">
        <div className="rounded-[2rem] bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-leaf">7日間の変化</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Summary label="平均散歩・遊び" value={`${Math.round(recentLogs.reduce((sum, log) => sum + log.walkMinutes, 0) / recentLogs.length)}分`} />
            <Summary label="最新体重" value={`${recentLogs[0]?.weight ?? "-"}kg`} />
            <Summary label="通院記録" value={`${recentLogs.filter((log) => log.hospitalVisit).length}件`} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-ink">最近7日分の記録</h2>
        <div className="grid gap-4">
          {recentLogs.map((log, index) => (
            <article key={`${log.date}-${index}`} className="rounded-3xl bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-bold text-ink">{log.date}</p>
                <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-leaf">
                  通院 {log.hospitalVisit ? "あり" : "なし"}
                </span>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <p>散歩・遊び: {log.walkMinutes}分</p>
                <p>食事: {log.mealQuality}</p>
                <p>体重: {log.weight}kg</p>
                <p>元気度: {log.energyLevel}</p>
                <p>便の状態: {log.stoolCondition}</p>
              </div>
              <p className="mt-3 text-sm text-slate-500">{log.memo}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ChoiceGroup({
  label,
  value,
  onChange,
  options,
  labels
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  labels?: Record<string, string>;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-2xl px-4 py-3 text-sm font-bold ring-1 transition ${
              value === option ? "bg-leaf text-white ring-leaf" : "bg-white text-slate-600 ring-slate-200 hover:bg-mint"
            }`}
          >
            {labels?.[option] ?? option}
          </button>
        ))}
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-ink">{value}</p>
    </div>
  );
}
