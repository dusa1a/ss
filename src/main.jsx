import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, Check, ChevronDown, Clock3, Download, Image,
  Layers3, Menu, Mic2, Music2, Pause, Play, Plus, Sparkles, Type, WandSparkles,
} from 'lucide-react';
import './styles.css';

const suggestions = [
  'Ранкова рутина продуктивного дизайнера',
  '3 факти про космос, які дивують',
  'Як зняти круте відео на телефон',
];

const scenes = [
  { time: '0:00–0:04', title: 'Хук', text: 'А що, як я скажу, що...' },
  { time: '0:04–0:12', title: 'Головна думка', text: 'Ось три прості кроки' },
  { time: '0:12–0:25', title: 'Розкриття', text: 'Почнімо з найважливішого' },
  { time: '0:25–0:30', title: 'Заклик до дії', text: 'Збережи, щоб не загубити' },
];

function Logo() {
  return <div className="logo"><span className="logo-mark"><Play size={14} fill="currentColor" /></span><span>shortly</span><b>AI</b></div>;
}

function App() {
  const [prompt, setPrompt] = useState('Розкажи 3 неочевидні факти про те, як музика впливає на наш мозок');
  const [style, setStyle] = useState('Кінематографічний');
  const [duration, setDuration] = useState('30 сек');
  const [voice, setVoice] = useState('Софія · теплий');
  const [captions, setCaptions] = useState(true);
  const [music, setMusic] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!generating) return undefined;
    const timer = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          clearInterval(timer);
          setGenerating(false);
          setToast('Ваш новий Short готовий!');
          return 100;
        }
        return value + 4;
      });
    }, 75);
    return () => clearInterval(timer);
  }, [generating]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const charCount = prompt.length;
  const videoTitle = useMemo(() => prompt.trim() || 'Ваше нове відео', [prompt]);

  function generate() {
    if (!prompt.trim()) {
      setToast('Спочатку опишіть ідею відео');
      return;
    }
    setProgress(0);
    setGenerating(true);
  }

  return (
    <div className="app-shell">
      <header>
        <Logo />
        <nav><a className="active" href="#studio">Студія</a><a href="#projects">Мої проєкти</a><a href="#templates">Шаблони</a></nav>
        <div className="header-actions"><button className="credits"><Sparkles size={15} /> 240 кредитів</button><button className="avatar">М</button><button className="menu"><Menu size={20} /></button></div>
      </header>

      <main id="studio">
        <section className="intro">
          <div className="eyebrow"><WandSparkles size={14} /> AI VIDEO STUDIO</div>
          <h1>Перетвори ідею на <em>відео.</em></h1>
          <p>Опиши задум — ми створимо сценарій, візуал, озвучку й музику для твого наступного YouTube Short.</p>
        </section>

        <section className="workspace">
          <div className="creator-panel">
            <div className="step-heading"><span>01</span><div><h2>Про що буде відео?</h2><p>Опиши тему, настрій та ключову думку.</p></div></div>
            <div className="prompt-wrap">
              <textarea value={prompt} maxLength={500} onChange={(e) => setPrompt(e.target.value)} aria-label="Ідея відео" />
              <div className="prompt-meta"><button onClick={() => setPrompt('')}><Plus size={15} /> Додати деталі</button><span>{charCount} / 500</span></div>
            </div>
            <div className="suggestions"><span>Спробуй:</span>{suggestions.map((item) => <button key={item} onClick={() => setPrompt(item)}>{item}</button>)}</div>

            <div className="divider" />
            <div className="step-heading compact"><span>02</span><div><h2>Налаштуй стиль</h2><p>Ми вже підібрали оптимальні параметри.</p></div></div>
            <div className="settings-grid">
              <label><span><Layers3 size={16} /> Візуальний стиль</span><div className="select-wrap"><select value={style} onChange={(e) => setStyle(e.target.value)}><option>Кінематографічний</option><option>Мінімалістичний</option><option>Яскравий поп</option><option>Документальний</option></select><ChevronDown size={16} /></div></label>
              <label><span><Clock3 size={16} /> Тривалість</span><div className="select-wrap"><select value={duration} onChange={(e) => setDuration(e.target.value)}><option>15 сек</option><option>30 сек</option><option>45 сек</option><option>60 сек</option></select><ChevronDown size={16} /></div></label>
              <label><span><Mic2 size={16} /> Голос</span><div className="select-wrap"><select value={voice} onChange={(e) => setVoice(e.target.value)}><option>Софія · теплий</option><option>Марко · енергійний</option><option>Олена · спокійний</option></select><ChevronDown size={16} /></div></label>
              <div className="toggle-group"><Toggle icon={<Type size={16} />} label="Субтитри" checked={captions} setChecked={setCaptions} /><Toggle icon={<Music2 size={16} />} label="Фонова музика" checked={music} setChecked={setMusic} /></div>
            </div>
            <button className="generate" onClick={generate} disabled={generating}>
              {generating ? <><span className="spinner" /> Створюємо магію… {progress}%</> : <><Sparkles size={19} /> Створити відео <ArrowRight size={18} /></>}
            </button>
            <p className="generation-note">Зазвичай це займає до 2 хвилин · 24 кредити</p>
          </div>

          <aside className="preview-panel">
            <div className="preview-header"><div><span>ПОПЕРЕДНІЙ ПЕРЕГЛЯД</span><h3>{videoTitle}</h3></div><button onClick={() => setToast('Відео додано до експорту')}><Download size={18} /></button></div>
            <div className={`phone-video ${playing ? 'playing' : ''}`}>
              <div className="ambient-orb orb-one" /><div className="ambient-orb orb-two" />
              <div className="video-top"><span>FACT <b>01</b></span><span className="sound-wave">▂▅▃▇▆▃▅</span></div>
              <div className="brain-art"><div className="brain-ring" /><div className="head-shape"><div className="brain-lines">⌁<br/>⌇</div></div><div className="note note-a">♪</div><div className="note note-b">♫</div></div>
              <div className="caption-card"><small>ТВІЙ МОЗОК НА МУЗИЦІ</small><strong>МУЗИКА МОЖЕ<br/><i>ЗМІНЮВАТИ</i><br/>СПРИЙНЯТТЯ ЧАСУ</strong><div className="caption-line"><span /></div></div>
              <button className="play-control" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Пауза' : 'Відтворити'}>{playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}</button>
              <div className="video-progress"><span /></div><div className="video-time">00:08 <span>/ 00:30</span></div>
            </div>
            <div className="scene-title"><span><Image size={16} /> Сценарій та сцени</span><button>Редагувати</button></div>
            <div className="scene-list">{scenes.map((scene, index) => <div className={`scene ${index === 1 ? 'selected' : ''}`} key={scene.time}><span className="scene-number">{String(index + 1).padStart(2, '0')}</span><div><small>{scene.time} · {scene.title}</small><p>{scene.text}</p></div><Check size={15} /></div>)}</div>
          </aside>
        </section>

        <section className="recent" id="projects"><div className="recent-heading"><div><span>ВАШІ ПРОЄКТИ</span><h2>Продовжити створення</h2></div><button>Усі проєкти <ArrowRight size={16} /></button></div><div className="project-row">
          <Project color="coral" title="5 звичок для кращого сну" meta="Чернетка · 24 сек" />
          <Project color="blue" title="Чому небо насправді фіолетове?" meta="Готово · 32 сек" />
          <button className="new-project" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Plus size={22} /><span>Новий проєкт</span></button>
        </div></section>
      </main>
      <footer><Logo /><span>Створено для великих ідей у короткому форматі.</span><span>© 2026 Shortly Studio</span></footer>
      {toast && <div className="toast"><Check size={17} />{toast}</div>}
    </div>
  );
}

function Toggle({ icon, label, checked, setChecked }) {
  return <button className="toggle-row" onClick={() => setChecked(!checked)}><span>{icon}{label}</span><i className={checked ? 'on' : ''}><b /></i></button>;
}

function Project({ color, title, meta }) {
  return <article className="project-card"><div className={`project-cover ${color}`}><span>9:16</span><Play fill="white" /></div><div><h3>{title}</h3><p>{meta}</p></div><button><ArrowRight size={18} /></button></article>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
