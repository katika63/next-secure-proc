// app/ai-chat/page.tsx
'use client';

export default function AIChatPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/ai-chatUI/btm-ai.html"
        className="w-full h-full border-0"
        title="BTMSecurity AI Terminal"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      />
    </div>
  );
}