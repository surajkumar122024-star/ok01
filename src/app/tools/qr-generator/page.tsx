"use client";

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Link as LinkIcon, FileText, Wifi, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QRGeneratorPage() {
  const [text, setText] = useState('https://');
  const [type, setType] = useState<'url' | 'text' | 'wifi'>('url');
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Wi-Fi Specific States
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');

  // Generate QR Code whenever inputs change
  useEffect(() => {
    let qrContent = text;

    if (type === 'wifi') {
      // Standard Wi-Fi QR Code Protocol Format: WIFI:S:SSID;T:WPA;P:PASSWORD;;
      qrContent = `WIFI:S:${ssid};T:${encryption};P:${password};;`;
    }

    if (!qrContent.trim()) {
      setQrUrl('');
      return;
    }

    QRCode.toDataURL(
      qrContent,
      {
        width: 600,
        margin: 2,
        color: {
          dark: '#000000',
          white: '#ffffff',
        },
      },
      (err, url) => {
        if (err) console.error(err);
        else setQrUrl(url);
      }
    );
  }, [text, type, ssid, password, encryption]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(type === 'wifi' ? `WIFI:S:${ssid};T:${encryption};P:${password};;` : text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <QrCode size={32} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">QR Code Generator</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Generate secure and instant QR codes for links, plain text, or wireless configurations locally on your machine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configurations Column */}
        <div className="lg:col-span-2 glass p-8 rounded-3xl border border-muted space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Type Toggles */}
            <div className="flex bg-muted/40 p-1.5 rounded-xl border border-muted/60 gap-1">
              <button
                onClick={() => { setType('url'); setText('https://'); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${type === 'url' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <LinkIcon size={16} /> URL
              </button>
              <button
                onClick={() => { setType('text'); setText(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${type === 'text' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <FileText size={16} /> Text
              </button>
              <button
                onClick={() => setType('wifi')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${type === 'wifi' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Wifi size={16} /> Wi-Fi
              </button>
            </div>

            {/* Dynamic Inputs based on type Selection */}
            {type !== 'wifi' ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  {type === 'url' ? 'Website URL' : 'Plain Text Content'}
                </label>
                <textarea
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={type === 'url' ? 'https://example.com' : 'Type your text content here...'}
                  className="w-full bg-muted/20 border border-muted/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Network Name (SSID)</label>
                  <input
                    type="text"
                    value={ssid}
                    onChange={(e) => setSsid(e.target.value)}
                    placeholder="e.g. Home_Network"
                    className="w-full bg-muted/20 border border-muted/80 rounded-xl h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Network password"
                    className="w-full bg-muted/20 border border-muted/80 rounded-xl h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Network Security Type</label>
                  <select
                    value={encryption}
                    onChange={(e) => setEncryption(e.target.value)}
                    className="w-full bg-muted/20 border border-muted/80 rounded-xl h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="WPA">WPA/WPA2/WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Unsecured (Open)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Action Helper Row */}
          {((type !== 'wifi' && text.trim().length > 0) || (type === 'wifi' && ssid.trim().length > 0)) && (
            <Button variant="outline" onClick={copyToClipboard} className="w-full mt-4 flex items-center justify-center gap-2">
              {copied ? (
                <>
                  <Check size={16} className="text-emerald-500" /> Copied Payload!
                </>
              ) : (
                <>
                  <Copy size={16} /> Copy Raw Content
                </>
              )}
            </Button>
          )}
        </div>

        {/* Live QR Output Canvas Display Column */}
        <div className="glass p-8 rounded-3xl border border-muted flex flex-col items-center justify-center space-y-6 text-center min-h-[350px]">
          {qrUrl ? (
            <>
              <div className="bg-white p-4 rounded-2xl border shadow-inner max-w-[240px] aspect-square transition-all duration-300">
                <img src={qrUrl} alt="Generated QR Code" className="w-full h-full object-contain select-none" />
              </div>
              <div className="w-full space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Live Preview</p>
                <a href={qrUrl} download={`${type}_qr_code.png`} className="block w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2">
                    <Download size={16} /> Download PNG
                  </Button>
                </a>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground/40 space-y-2 p-8">
              <QrCode size={64} strokeWidth={1} className="animate-pulse" />
              <p className="text-sm font-medium">Waiting for input configurations...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
