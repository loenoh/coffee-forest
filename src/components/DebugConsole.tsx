import { useState, useEffect } from 'react';
import { X, Terminal } from 'lucide-react';

export default function DebugConsole() {
    const [isOpen, setIsOpen] = useState(false);
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if ((window as any).__debugLogs) {
                setLogs([...(window as any).__debugLogs].reverse());
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 z-[9999] bg-black/80 text-white p-3 rounded-full shadow-lg border border-white/20"
            >
                <Terminal className="w-5 h-5" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 w-full h-[300px] z-[9999] bg-black/95 text-[10px] font-mono p-4 border-t border-white/20 overflow-y-auto flex flex-col shadow-2xl">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                <span className="font-bold text-primary">SYSTEM DEBUG CONSOLE</span>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
                    <X className="w-4 h-4" />
                </button>
            </div>
            <div className="flex flex-col gap-1">
                {logs.length === 0 && <p className="text-white/30 text-center py-8">No logs captured yet.</p>}
                {logs.map((log, i) => (
                    <div key={i} className={`p-1 rounded ${log.type === 'error' ? 'bg-red-500/20 text-red-400' : 'text-green-400/80'}`}>
                        <span className="text-white/30 mr-2">[{log.time}]</span>
                        {log.message}
                    </div>
                ))}
            </div>
        </div>
    );
}
