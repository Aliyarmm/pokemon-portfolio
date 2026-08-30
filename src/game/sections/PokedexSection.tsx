import React, { useState } from "react";
import { projects, type Project } from "@/data";

export const PokedexSection: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto rpg-scroll">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📖</span>
        <div
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: "14px",
            color: "var(--rpg-gold)",
            textShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
          }}
        >
          POKéDEX
        </div>
        <div
          className="ml-auto"
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: "7px",
            color: "var(--rpg-text-dim)",
          }}
        >
          {projects.filter((p) => p.status !== "secret").length}/{projects.length} SEEN
        </div>
      </div>

      <div
        className="mb-4"
        style={{
          height: "3px",
          background: "linear-gradient(90deg, var(--rpg-accent), var(--rpg-gold), var(--rpg-accent))",
        }}
      />

      <div className="flex flex-col md:flex-row gap-4">
        {/* Project List */}
        <div className="w-full md:w-1/3 space-y-2">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelected(project)}
              className="w-full text-left p-3 transition-all duration-100"
              style={{
                background:
                  selected?.id === project.id
                    ? "rgba(233, 69, 96, 0.2)"
                    : "rgba(255,255,255,0.03)",
                border: `2px solid ${
                  selected?.id === project.id ? "var(--rpg-accent)" : "rgba(255,255,255,0.08)"
                }`,
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "8px",
                    color: "var(--rpg-text-dim)",
                  }}
                >
                  {project.number}
                </span>
                <span
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "9px",
                    color: project.status === "secret" ? "var(--rpg-text-dim)" : "var(--rpg-text)",
                  }}
                >
                  {project.name}
                </span>
                {project.status === "active" && (
                  <span
                    className="ml-auto px-1"
                    style={{
                      fontFamily: "var(--rpg-font)",
                      fontSize: "5px",
                      color: "var(--rpg-green)",
                      background: "rgba(74, 222, 128, 0.15)",
                      border: "1px solid var(--rpg-green)",
                    }}
                  >
                    ●
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Project Detail */}
        {selected ? (
          <div
            className="flex-1 p-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "2px solid rgba(233, 69, 96, 0.3)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 flex items-center justify-center text-2xl"
                style={{
                  background: "rgba(233, 69, 96, 0.15)",
                  border: "2px solid var(--rpg-accent)",
                }}
              >
                {selected.status === "secret" ? "❓" : "📦"}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "6px",
                    color: "var(--rpg-text-dim)",
                  }}
                >
                  {selected.number}
                </div>
                <div
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "12px",
                    color: "var(--rpg-text)",
                  }}
                >
                  {selected.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "7px",
                    color: "var(--rpg-accent)",
                  }}
                >
                  {selected.type}
                </div>
              </div>
            </div>

            <div
              className="mb-3 p-3"
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "7px",
                color: "var(--rpg-text)",
                lineHeight: "1.8",
                background: "rgba(0,0,0,0.2)",
                borderLeft: "3px solid var(--rpg-accent)",
              }}
            >
              {selected.longDescription}
            </div>

            {/* Technologies */}
            <div className="mb-3">
              <div
                style={{
                  fontFamily: "var(--rpg-font)",
                  fontSize: "7px",
                  color: "var(--rpg-accent)",
                  marginBottom: "4px",
                }}
              >
                TECH USED
              </div>
              <div className="flex flex-wrap gap-1">
                {selected.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1"
                    style={{
                      fontFamily: "var(--rpg-font)",
                      fontSize: "6px",
                      color: "var(--rpg-text)",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Status + Links */}
            <div className="flex items-center gap-3">
              <span
                className="px-2 py-1"
                style={{
                  fontFamily: "var(--rpg-font)",
                  fontSize: "6px",
                  color:
                    selected.status === "active"
                      ? "var(--rpg-green)"
                      : selected.status === "completed"
                      ? "var(--rpg-blue)"
                      : "var(--rpg-text-dim)",
                  background:
                    selected.status === "active"
                      ? "rgba(74, 222, 128, 0.15)"
                      : selected.status === "completed"
                      ? "rgba(96, 165, 250, 0.15)"
                      : "rgba(255,255,255,0.05)",
                  border: `1px solid ${
                    selected.status === "active"
                      ? "var(--rpg-green)"
                      : selected.status === "completed"
                      ? "var(--rpg-blue)"
                      : "rgba(255,255,255,0.1)"
                  }`,
                  textTransform: "uppercase",
                }}
              >
                {selected.status}
              </span>
              {selected.repo && selected.repo !== "#" && (
                <a
                  href={selected.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 transition-colors"
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "6px",
                    color: "var(--rpg-text)",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  REPO →
                </a>
              )}
              {selected.demo && selected.demo !== "#" && (
                <a
                  href={selected.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 transition-colors"
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "6px",
                    color: "var(--rpg-text)",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  DEMO →
                </a>
              )}
            </div>
          </div>
        ) : (
          <div
            className="flex-1 flex items-center justify-center p-8"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "2px dashed rgba(255,255,255,0.1)",
            }}
          >
            <div
              className="text-center"
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "8px",
                color: "var(--rpg-text-dim)",
              }}
            >
              SELECT A PROJECT
              <br />
              TO VIEW DETAILS
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
