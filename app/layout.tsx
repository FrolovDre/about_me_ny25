import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Новогоднее портфолио',
  description: 'Праздничный лендинг-портфолио в стиле Рождества и Нового года.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
