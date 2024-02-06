export const speakText = (text: string) =>
	speechSynthesis.speak(new SpeechSynthesisUtterance(text));
