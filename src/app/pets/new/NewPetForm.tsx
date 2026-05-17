"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addLocalPet, type PetProfileInput } from "@/lib/localPets";

export function NewPetForm() {
  const router = useRouter();
  const [form, setForm] = useState<PetProfileInput>({
    name: "",
    type: "dog",
    breed: "",
    age: 3,
    gender: "男の子",
    ownerName: "",
    weight: 5
  });

  function updateField<Key extends keyof PetProfileInput>(field: Key, value: PetProfileInput[Key]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const pet = addLocalPet(form);
    router.push(`/pets/${pet.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
      <div>
        <p className="text-sm font-semibold text-leaf">うちの子プロフィール</p>
        <h2 className="mt-1 text-2xl font-bold text-ink">まずは基本情報だけで登録できます</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          テロメア検査結果がまだなくても大丈夫です。登録後はモックの初期スコアを使って、健康年齢の見え方を体験できます。
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="名前" value={form.name} onChange={(value) => updateField("name", value)} placeholder="例: まる" required />
        <TextField label="飼い主名" value={form.ownerName} onChange={(value) => updateField("ownerName", value)} placeholder="例: 高橋 陽子" required />
        <Choice
          label="種類"
          value={form.type}
          onChange={(value) => updateField("type", value as PetProfileInput["type"])}
          options={[
            ["dog", "犬"],
            ["cat", "猫"]
          ]}
        />
        <TextField label="品種" value={form.breed} onChange={(value) => updateField("breed", value)} placeholder="例: チワワ" required />
        <NumberField label="年齢" value={form.age} onChange={(value) => updateField("age", value)} min={0} step={1} />
        <NumberField label="体重（kg）" value={form.weight} onChange={(value) => updateField("weight", value)} min={0} step={0.1} />
        <Choice
          label="性別"
          value={form.gender}
          onChange={(value) => updateField("gender", value)}
          options={[
            ["男の子", "男の子"],
            ["女の子", "女の子"],
            ["未設定", "未設定"]
          ]}
        />
      </div>

      <div className="rounded-3xl bg-cream p-5">
        <p className="text-sm font-bold text-ink">登録後に見られること</p>
        <div className="mt-3 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
          <p>健康年齢と実年齢の差</p>
          <p>今日やるケア</p>
          <p>テロメア検査の見え方</p>
        </div>
      </div>

      <button type="submit" className="w-full rounded-full bg-leaf px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
        うちの子を登録する
      </button>
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="space-y-2 text-sm font-semibold text-slate-600">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-leaf"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  step
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  step: number;
}) {
  return (
    <label className="space-y-2 text-sm font-semibold text-slate-600">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        type="number"
        min={min}
        step={step}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-leaf"
      />
    </label>
  );
}

function Choice({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(([optionValue, labelText]) => (
          <button
            key={optionValue}
            type="button"
            onClick={() => onChange(optionValue)}
            className={`rounded-2xl px-4 py-3 text-sm font-bold ring-1 transition ${
              value === optionValue ? "bg-leaf text-white ring-leaf" : "bg-white text-slate-600 ring-slate-200 hover:bg-mint"
            }`}
          >
            {labelText}
          </button>
        ))}
      </div>
    </div>
  );
}
