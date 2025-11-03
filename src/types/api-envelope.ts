import { z } from "zod";

// Generic API envelope helper for responses
export const ApiEnvelope = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    transactionId: z.string(),
    conversationId: z.string(),
    correlationConversationId: z.string(),
    originatorConversationId: z.string(),
    resultCode: z.string(),
    resultDescription: z.string(),
    data: dataSchema,
  });

// Type helper for compile-time typing of the envelope
export type ApiEnvelopeType<T> = {
  transactionId: string;
  conversationId: string;
  correlationConversationId: string;
  originatorConversationId: string;
  resultCode: string;
  resultDescription: string;
  data: T;
};