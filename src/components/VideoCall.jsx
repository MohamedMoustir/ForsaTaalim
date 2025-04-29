
import React, { useEffect, useRef } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { Nav } from "./Nav";
import { useParams } from "react-router-dom";
import { getUser } from "../utils/config";
import { useNavigate } from "react-router-dom";
const VideoCall = ({ displayName }) => {

  const jitsiContainer = useRef(null);
  const { session } = useParams();
  const user = getUser();
  console.log(session);
  const navigate =useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div
          className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50"
          aria-label="Go back"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span onClick={() => navigate('/Mespaiements')} className="hidden cursor-pointer sm:inline">Back</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">ForsaTaalim - Cours en direct</h1>
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4">
          <JitsiMeeting
            domain="meet.jit.si"
            roomName={session}
            configOverwrite={{
              startWithAudioMuted: true,
              startWithVideoMuted: false,
              disableDeepLinking: true,
            }}
            interfaceConfigOverwrite={{
              SHOW_JITSI_WATERMARK: false,
              SHOW_WATERMARK_FOR_GUESTS: false,
              SHOW_BRAND_WATERMARK: false,
              SHOW_POWERED_BY: false,
              DEFAULT_BACKGROUND: "#f4f4f4",
              TOOLBAR_ALWAYS_VISIBLE: false,
              HIDE_INVITE_MORE_HEADER: true,
              MOBILE_APP_PROMO: false,
            }}
            userInfo={{
              displayName: displayName,
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = "500px";
              iframeRef.style.width = "100%";
              iframeRef.style.borderRadius = "12px";
              iframeRef.style.backgroundColor = "#f4f4f4";
            }}
          />
        </div>
      </div>
    </>
  );


};

export default VideoCall;
