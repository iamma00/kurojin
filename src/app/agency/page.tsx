"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import GlassSurface from "@/components/GlassSurface";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "sending" | "success" | "error";

const SUBJECTS = ["Infra / Cluster work", "Frontend build", "Just saying hi"];

export default function ContactPage() {
  const root = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.08,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setErrorMsg("Name, email, and message are required.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Couldn't send that — try again, or email directly.");
    }
  };

  return (
    <div ref={root} className="bg-void text-ink min-h-screen px-6 md:px-10 pt-32 pb-24">
      <div className="max-w-3xl">
        <p className="reveal mono-label mb-6">CONTACT / 01</p>
        <h1 className="reveal font-display text-[12vw] md:text-[5.5vw] leading-[0.95] tracking-tight">
          Let&apos;s get
          <br />
          something running.
        </h1>
        <p className="reveal mt-6 text-muted max-w-md">
          Cluster issue, a frontend build, or just want to talk shop —
          this goes straight to the inbox, logged to a sheet on the way in.
        </p>
      </div>

      <div className="reveal mt-14 max-w-2xl">
        <GlassSurface borderRadius={20} className="!w-full px-6 md:px-10 py-10">
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid md:grid-cols-2 gap-7">
              <Field label="NAME">
                <input
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className="input"
                  autoComplete="name"
                />
              </Field>
              <Field label="EMAIL">
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@email.com"
                  className="input"
                  autoComplete="email"
                />
              </Field>
            </div>

            <Field label="SUBJECT">
              <div className="flex flex-wrap gap-2 mt-2">
                {SUBJECTS.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setForm((f) => ({ ...f, subject: s }))}
                    className={`mono-label px-3 py-2 rounded-full border transition-colors ${
                      form.subject === s
                        ? "border-signal text-signal"
                        : "border-line text-muted hover:text-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="MESSAGE">
              <textarea
                value={form.message}
                onChange={update("message")}
                placeholder="What are we building or fixing?"
                rows={5}
                className="input resize-none"
              />
            </Field>

            {status === "error" && (
              <p className="mono-label text-signal">{errorMsg}</p>
            )}
            {status === "success" && (
              <p className="mono-label text-data">
                Sent — logged and on its way. Talk soon.
              </p>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ x: status === "sending" ? 0 : 4 }}
              className="mono-label text-ink border border-line rounded-full px-6 py-3 inline-flex items-center gap-3 hover:border-data hover:text-data transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "SENDING…" : "SEND MESSAGE →"}
            </motion.button>
          </form>
        </GlassSurface>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--line);
          padding: 10px 2px;
          color: var(--ink);
          font-family: var(--font-body);
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .input::placeholder {
          color: var(--muted);
        }
        .input:focus {
          border-color: var(--data);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mono-label">{label}</span>
      <div className="mt-2">{children}</div>
    </div>
  );
}