import { Message } from "postcss";

export function formatMessages(utterances: any[]){
  const messages = [];
  let currentMessage = {
    content: utterances[0].text,
    role: utterances[0].speaker === 0 ? 'agent' : 'user' as 'agent' | 'user',
    start: utterances[0].start,
    end: utterances[0].end,
  };

  for (let i = 1; i < utterances.length; i++) {
    const utterance = utterances[i];
    const isSameSpeaker = currentMessage.role === (utterance.speaker === 0 ? 'agent' : 'user' as 'agent' | 'user');

    if (isSameSpeaker) {
      
      currentMessage.content += ' ' + utterance.text;
      currentMessage.end = utterance.end; 
    } else {
      
      messages.push(currentMessage);
      currentMessage = {
        content: utterance.text,
        role: utterance.speaker === 0 ? 'agent' : 'user',
        start: utterance.start,
        end: utterance.end,
      };
    }
  }


  messages.push(currentMessage);

  return messages;
}