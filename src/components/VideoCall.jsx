
import React, { useEffect, useRef } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

const VideoCall =  ({ roomName = `meeting-ezdabzaùCBO!oùb`, displayName }) => {
  const jitsiContainer = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">ForsaTaalim - Cours en direct</h1>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4">
        <JitsiMeeting
          domain="meet.jit.si"
          roomName={roomName}
          configOverwrite={{
            startWithAudioMuted: true,
            startWithVideoMuted: false,
          }}
          interfaceConfigOverwrite={{
            SHOW_JITSI_WATERMARK: false,     
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,     
            SHOW_POWERED_BY: false,     
            DEFAULT_BACKGROUND: "#f4f4f4",
          }}
          userInfo={{
            displayName: displayName,
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "500px";
            iframeRef.style.width = "100%";
          }}
        />
      </div>
    </div>
  );

};

export default VideoCall;
