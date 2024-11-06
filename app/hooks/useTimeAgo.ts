import { useEffect, useState } from 'react';

export const useTimeAgo = (dateString: string) => {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const updateTimeAgo = () => {
            const now = new Date();
            const postDate = new Date(dateString);
            const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

            if (diffInSeconds < 60) {
                setTimeAgo(`${diffInSeconds} segundos atrás`);
            } else if (diffInSeconds < 3600) {
                setTimeAgo(`${Math.floor(diffInSeconds / 60)} minutos atrás`);
            } else if (diffInSeconds < 86400) {
                setTimeAgo(`${Math.floor(diffInSeconds / 3600)} horas atrás`);
            } else {
                setTimeAgo(`${Math.floor(diffInSeconds / 86400)} dias atrás`);
            }
        };

        updateTimeAgo();
        const intervalId = setInterval(updateTimeAgo, 120000); // Atualiza a cada 2 minutos

        return () => clearInterval(intervalId);
    }, [dateString]);

    return timeAgo;
}