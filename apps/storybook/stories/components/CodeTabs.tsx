import React, { useState } from "react";

interface CodeTabsProps {
  react: string;
  vue2: string;
  vue3: string;
}

export const CodeTabs: React.FC<CodeTabsProps> = ({ react, vue2, vue3 }) => {
  const [activeTab, setActiveTab] = useState<"react" | "vue2" | "vue3">("react");

  const tabs = [
    { id: "react" as const, label: "React", code: react, language: "tsx" },
    { id: "vue2" as const, label: "Vue 2 + Bootstrap", code: vue2, language: "vue" },
    { id: "vue3" as const, label: "Vue 3", code: vue3, language: "vue" },
  ];

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "8px",
          borderBottom: "2px solid #e0e0e0",
          marginBottom: "0",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 20px",
              border: "none",
              background: activeTab === tab.id ? "#1ea7fd" : "#f5f5f5",
              color: activeTab === tab.id ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: activeTab === tab.id ? "600" : "400",
              fontSize: "14px",
              borderRadius: "4px 4px 0 0",
              transition: "all 0.2s ease",
              borderBottom: activeTab === tab.id ? "2px solid #1ea7fd" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        style={{
          background: "#1e1e1e",
          padding: "16px",
          borderRadius: "0 4px 4px 4px",
          overflow: "auto",
        }}
      >
        <pre
          style={{
            margin: 0,
            color: "#d4d4d4",
            fontSize: "13px",
            fontFamily: "Consolas, Monaco, 'Courier New', monospace",
            lineHeight: "1.5",
          }}
        >
          <code>{tabs.find((t) => t.id === activeTab)?.code}</code>
        </pre>
      </div>
    </div>
  );
};
