import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, ShieldCheck, ShieldAlert, AlertTriangle, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'analysis';
  details?: any;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Eu sou o Validador de Boletos. Envie uma foto ou PDF do seu boleto e me diga do que se trata (ex: "conta de luz").',
    },
  ]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loadingMessage, setLoadingMessage] = useState('Lendo código de barras...');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isLoading) {
      const messages = [
        'Lendo código de barras...',
        'Validando CNPJ...',
        'Consultando Receita Federal...',
        'Analisando segurança...',
        'Verificando histórico...'
      ];
      let i = 0;
      setLoadingMessage(messages[0]);
      interval = setInterval(() => {
        i = (i + 1) % messages.length;
        setLoadingMessage(messages[i]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input && !file) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    if (file) {
      userMessage.content = `[Arquivo: ${file.name}] ${input}`;
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      formData.append('context', input);

      // Replace with your actual API endpoint
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/chat/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        type: 'analysis',
        details: data,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Desculpe, ocorreu um erro ao processar seu pedido. Tente novamente.',
        },
      ]);
    } finally {
      setIsLoading(false);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col h-[85vh] max-w-md mx-auto bg-card border border-border shadow-2xl rounded-xl overflow-hidden">
      <CardHeader className="border-b bg-slate-900/50 z-10">
        <CardTitle className="flex items-center gap-2 text-xl">
          <ShieldCheck className="w-6 h-6 text-primary" />
          Boleto Sem Medo
        </CardTitle>
      </CardHeader>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex w-full",
              msg.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                msg.role === 'user'
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-700/50 text-slate-100 rounded-bl-none"
                // : "bg-slate-700 text-slate-100 rounded-bl-none"
                // "bg-gray-700 text-foreground rounded-bl-none"
              )}
            >
              <div className="whitespace-pre-wrap">
                {msg.content}
              </div>

              {msg.type === 'analysis' && msg.details && (
                <div className="mt-3 p-3 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 font-semibold mb-1">
                    {msg.details.riskLevel === 'low' && <ShieldCheck className="w-4 h-4 text-green-500" />}
                    {msg.details.riskLevel === 'medium' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    {msg.details.riskLevel === 'high' && <ShieldAlert className="w-4 h-4 text-red-500" />}
                    <span>Análise de Risco: {msg.details.riskLevel === 'low' ? 'Baixo' : msg.details.riskLevel === 'medium' ? 'Médio' : 'Alto'}</span>
                  </div>
                  {msg.details.details?.aiResult?.value && (
                    <p className="text-xs opacity-80">Valor: {msg.details.details.aiResult.value}</p>
                  )}
                  {msg.details.details?.aiResult?.beneficiary && (
                    <p className="text-xs opacity-80">Beneficiário: {msg.details.details.aiResult.beneficiary}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}


        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700/50 rounded-2xl rounded-bl-none px-4 py-3 text-slate-100 text-sm flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200" />
              </div>
              <span className="animate-pulse">{loadingMessage}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-slate-900/50">
        {file && (
          <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-muted/50 rounded-md text-xs text-muted-foreground">
            <FileText className="w-4 h-4" />
            <span className="truncate flex-1">{file.name}</span>
            <button onClick={() => setFile(null)} className="hover:text-destructive">×</button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*,application/pdf"
            onChange={handleFileSelect}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0"
          >
            <Upload className="w-5 h-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite o contexto (ex: conta de luz)..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || (!input && !file)}>
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
