export function formatMessages(utterances: any[]) {
  const messages = [];
  let currentMessage = {
    content: utterances[0].text,
    role: utterances[0].speaker === 0 ? 'agent' : 'user', // Asumimos que 0 es agente y 1 es usuario
    start: utterances[0].start,
    end: utterances[0].end,
  };

  for (let i = 1; i < utterances.length; i++) {
    const utterance = utterances[i];
    const isSameSpeaker = currentMessage.role === (utterance.speaker === 0 ? 'agent' : 'user');

    if (isSameSpeaker) {
      // Agregar texto al mensaje actual
      currentMessage.content += ' ' + utterance.text;
      currentMessage.end = utterance.end; // Actualizar el final del mensaje
    } else {
      // Empujar el mensaje anterior y empezar uno nuevo
      messages.push(currentMessage);
      currentMessage = {
        content: utterance.text,
        role: utterance.speaker === 0 ? 'agent' : 'user',
        start: utterance.start,
        end: utterance.end,
      };
    }
  }

  // Asegurar que el último mensaje sea agregado
  messages.push(currentMessage);

  return messages;
}