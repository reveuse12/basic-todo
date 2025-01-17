"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mic,
  Square,
  Loader2,
  AudioWaveformIcon as Waveform,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { audioTodoCreate } from "@/app/actions";

export function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcesing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        await processAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  }, [isRecording]);

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // Create FormData with the audio blob
      const formData = new FormData();
      formData.append("audio", audioBlob);

      // Pass the FormData to `audioTodoCreate`
      const res = await audioTodoCreate(formData);
      setTranscript(res.transcript); // Update based on backend response
    } catch (error) {
      console.error("Error processing audio:", error);
      setTranscript("Error processing audio. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        className={cn(
          "h-10 w-10 rounded-full",
          isRecording && "bg-red-500 hover:bg-red-600"
        )}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? (
          <Square className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
        {isRecording && (
          <div className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
        )}
      </Button>
      {(isRecording || isProcesing || transcript) && (
        <Card className="p-2">
          <CardContent className="p-2 space-y-2">
            <div className="text-sm">
              {isRecording ? (
                <div className="flex items-center gap-2">
                  <Waveform className="h-4 w-4 animate-pulse" />
                  <span>Recording...</span>
                </div>
              ) : isProcesing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                transcript && (
                  <div className="max-w-[200px]">
                    <div className="text-xs text-muted-foreground">
                      {transcript}
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
