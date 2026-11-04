import React, { useState, useEffect } from 'react';
import { 
  Heart, Sparkles, MessageCircle, Share2, Shield, User, Home, Users, 
  Settings, Plus, Image, Smile, Eye, EyeOff, Volume2, Type, Award, 
  Check, Filter, Search, Bell, Sun, Moon, Flag, Send, HelpCircle,
  Coffee, Feather, Star, Compass, AlertTriangle, Layers
} from 'lucide-react';

// --- DATOS INICIALES Y MOCKS ---
const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Elena R. (Ella/She)',
    handle: '@elena_bloom',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    time: 'Hace 15 min',
    content: '¡Hoy abrimos un nuevo taller de arte terapia adaptado para personas neurodivergentes! 🌸 Todos los cuerpos, mentes y ritmos son bienvenidos. La creatividad no tiene moldes. ✨',
    tags: ['✨ Positividad', '♿ Accesibilidad', '🌸 Comunidad'],
    likes: 24,
    loves: 18,
    supports: 32,
    hasUserReacted: false,
    comments: [
      { id: 101, author: 'Alex (Ellx/They)', text: '¡Qué hermosa iniciativa! Me encantaría participar 💖' },
      { id: 102, author: 'Mateo (Él/He)', text: '¿Será presencial o en línea? ¡Gracias por crear estos espacios!' }
    ],
    contentWarning: ''
  },
  {
    id: 2,
    author: 'Sora & Cam (Ellos/Them)',
    handle: '@queer_art',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    time: 'Hace 1 hora',
    content: 'Recordatorio diario: Tu valía no se mide por tu productividad. Tómate una pausa, respira profundo y regálate un abrazo suave hoy. 🌿💖',
    tags: ['💖 Self-Care', '🌈 Pride & Diversidad', '🌿 Safe Space'],
    likes: 45,
    loves: 62,
    supports: 19,
    hasUserReacted: false,
    comments: [
      { id: 103, author: 'Lucía (Ella/She)', text: 'Justo lo que necesitaba leer hoy. Gracias ❤️' }
    ],
    contentWarning: ''
  },
  {
    id: 3,
    author: 'Valen (Ella/Elle)',
    handle: '@valen_vibes',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
    time: 'Hace 3 horas',
    content: 'Un espacio sobre ansiedad social y cómo manejarla en reuniones familiares. Comparto reflexiones y tips que me han funcionado mucho.',
    tags: ['🌿 Safe Space', '💖 Self-Care'],
    likes: 12,
    loves: 8,
    supports: 27,
    hasUserReacted: false,
    comments: [],
    contentWarning: 'Mención de ansiedad social y estrés emocional'
  }
];

const INITIAL_AFFIRMATIONS = [
  { id: 1, text: 'Tu voz importa y tu presencia ilumina este espacio. ✨', author: 'Anónimo', color: 'bg-rose-100 border-rose-300 text-rose-900' },
  { id: 2, text: 'Está bien ir a tu propio ritmo. No hay prisa para florecer. 🌸', author: 'Cam', color: 'bg-pink-100 border-pink-300 text-pink-900' },
  { id: 3, text: 'Eres suficiente exactamente como eres hoy. 💖', author: 'Val', color: 'bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900' },
  { id: 4, text: 'Tus emociones son válidas y merecen ser escuchadas. 🌿', author: 'Comunidad', color: 'bg-purple-100 border-purple-300 text-purple-900' },
];

const COMMUNITIES = [
  { id: 'neuro', name: 'Neurodivergente & Orgullox', members: '1.2k miembros', icon: '🧠', desc: 'Espacio seguro para reflexiones, apoyo e intercambio de experiencias TDAH, Autismo y más.' },
  { id: 'lgbtq', name: 'LGBTQIA+ Safe Haven', members: '3.4k miembros', icon: '🌈', desc: 'Celebrando la diversidad afectivo-sexual y de género en un entorno amoroso y respetuoso.' },
  { id: 'selflove', name: 'Amor Propio & Salud Mental', members: '2.8k miembros', icon: '💖', desc: 'Herramientas, afirmaciones y acompañamiento para cuidar tu bienestar interior.' },
  { id: 'creative', name: 'Rincón Creativo Inclusivo', members: '950 miembros', icon: '🎨', desc: 'Arte, poesía, diseño e ilustración libre de juicios y llena de sororidad y empatía.' }
];

const AVAILABLE_TAGS = ['✨ Positividad', '🌈 Pride & Diversidad', '💖 Self-Care', '🌸 Comunidad', '♿ Accesibilidad', '🌿 Safe Space'];

export default function App() {
  // --- ESTADOS PRINCIPALES ---
  const [activeTab, setActiveTab] = useState('feed'); // 'feed', 'communities', 'profile', 'settings'
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [affirmations, setAffirmations] = useState(INITIAL_AFFIRMATIONS);
  const [selectedTagFilter, setSelectedTagFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Estados Accesibilidad
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); // 'normal', 'large', 'xlarge'
  const [autoShowCW, setAutoShowCW] = useState(false);

  // Perfil del Usuario
  const [userProfile, setUserProfile] = useState({
    name: 'Sofi Martínez',
    pronouns: 'Ella / Elle',
    handle: '@sofi_pink',
    bio: 'Apasionada del diseño accesible, la ilustración botánica y el activismo de amor propio 🌸✨ Siempre buscando hacer la web más rosita e inclusiva.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    badges: ['💖 Creadora Inclusiva', '🌈 Aliada LGBTQ+', '♿ Accesibilidad Lover', '✨ Mente Positiva'],
    audioIntro: 'Hola! Soy Sofi, me encanta crear comunidad y compartir buena vibra.',
    bannerColor: 'from-pink-400 via-rose-300 to-fuchsia-400'
  });

  // Formulario nuevo post
  const [newPostText, setNewPostText] = useState('');
  const [newPostTags, setNewPostTags] = useState([]);
  const [newPostCW, setNewPostCW] = useState('');
  const [showCWInput, setShowCWInput] = useState(false);

  // Formulario nueva afirmación
  const [newAffirmationText, setNewAffirmationText] = useState('');
  const [newAffirmationAuthor, setNewAffirmationAuthor] = useState('');

  // Reproductor Audio Simulado
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Manejo de advertencias reveladas individualmente
  const [revealedCWs, setRevealedCWs] = useState({});

  // --- REACCIONES Y COMENTARIOS ---
  const handleReaction = (postId, type) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const key = type === 'like' ? 'likes' : type === 'love' ? 'loves' : 'supports';
        const alreadyReacted = p.hasUserReacted;
        return {
          ...p,
          [key]: alreadyReacted ? p[key] - 1 : p[key] + 1,
          hasUserReacted: !alreadyReacted
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId, text) => {
    if (!text.trim()) return;
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            { id: Date.now(), author: `${userProfile.name} (${userProfile.pronouns})`, text }
          ]
        };
      }
      return p;
    }));
  };

  // --- CREACIÓN DE POST ---
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: `${userProfile.name} (${userProfile.pronouns})`,
      handle: userProfile.handle,
      avatar: userProfile.avatar,
      time: 'Justo ahora',
      content: newPostText,
      tags: newPostTags.length > 0 ? newPostTags : ['✨ Positividad'],
      likes: 1,
      loves: 1,
      supports: 1,
      hasUserReacted: true,
      comments: [],
      contentWarning: showCWInput ? newPostCW : ''
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    setNewPostTags([]);
    setNewPostCW('');
    setShowCWInput(false);
  };

  const toggleTagSelection = (tag) => {
    if (newPostTags.includes(tag)) {
      setNewPostTags(newPostTags.filter(t => t !== tag));
    } else {
      setNewPostTags([...newPostTags, tag]);
    }
  };

  // --- AGREGAR AFIRMACIÓN ---
  const handleAddAffirmation = (e) => {
    e.preventDefault();
    if (!newAffirmationText.trim()) return;
    
    const bgColors = [
      'bg-rose-100 border-rose-300 text-rose-900',
      'bg-pink-100 border-pink-300 text-pink-900',
      'bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900',
      'bg-purple-100 border-purple-300 text-purple-900'
    ];
    const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];

    const item = {
      id: Date.now(),
      text: newAffirmationText,
      author: newAffirmationAuthor.trim() || 'Corazón Rosa',
      color: randomColor
    };

    setAffirmations([item, ...affirmations]);
    setNewAffirmationText('');
    setNewAffirmationAuthor('');
  };

  // --- FILTRADO DE POSTS ---
  const filteredPosts = posts.filter(post => {
    const matchesTag = selectedTagFilter === 'Todos' || post.tags.includes(selectedTagFilter);
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  // Clases dinámicas de fuentes y contraste
  const fontSizeClasses = {
    normal: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      highContrast 
        ? 'bg-black text-yellow-300 font-sans' 
        : dyslexicFont 
          ? 'bg-rose-50/60 text-gray-800 font-mono' 
          : 'bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 text-gray-800 font-sans'
    } ${fontSizeClasses[fontSize]}`}>
      
      {/* HEADER / BARRA SUPERIOR */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        highContrast 
          ? 'bg-black border-yellow-300' 
          : 'bg-white/80 border-pink-200/60 shadow-sm'
      }`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md transform hover:rotate-6 transition-transform ${
              highContrast ? 'bg-yellow-300 text-black' : 'bg-gradient-to-tr from-pink-500 to-rose-400 text-white'
            }`}>
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className={`font-black tracking-wide text-xl leading-none ${
                highContrast ? 'text-yellow-300' : 'bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent'
              }`}>
                Bloom ✨
              </h1>
              <p className="text-xs opacity-75 font-medium">Red Social Inclusiva & Segura</p>
            </div>
          </div>

          {/* Búsqueda rápida */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 absolute left-3 text-pink-400" />
            <input
              type="text"
              placeholder="Buscar amor, temas o amigxs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-4 py-1.5 rounded-full text-sm outline-none transition-all ${
                highContrast 
                  ? 'bg-gray-900 border border-yellow-300 text-yellow-300 focus:ring-1 focus:ring-yellow-300' 
                  : 'bg-pink-100/60 border border-pink-200 focus:bg-white focus:ring-2 focus:ring-pink-300 text-gray-700'
              }`}
            />
          </div>

          {/* Accesibilidad Rápida & Acciones */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHighContrast(!highContrast)}
              title="Alternar Alto Contraste"
              aria-label="Alto contraste"
              className={`p-2 rounded-full transition-all ${
                highContrast 
                  ? 'bg-yellow-300 text-black' 
                  : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
              }`}
            >
              <Eye className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              title="Ajustes de Inclusión"
              className={`p-2 rounded-full transition-all ${
                activeTab === 'settings' 
                  ? (highContrast ? 'border border-yellow-300' : 'bg-pink-500 text-white shadow-md') 
                  : (highContrast ? 'text-yellow-300' : 'bg-pink-100 text-pink-700 hover:bg-pink-200')
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-pink-200">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-pink-400"
              />
              <span className="hidden lg:inline text-xs font-semibold">{userProfile.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL LAYOUT */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* SIDEBAR NAVEGACIÓN (Izquierda) */}
        <aside className="md:col-span-3 space-y-4">
          <nav className={`p-3 rounded-2xl border ${
            highContrast 
              ? 'bg-black border-yellow-300' 
              : 'bg-white/80 border-pink-200/80 shadow-sm backdrop-blur-sm'
          }`}>
            <ul className="space-y-1">
              {[
                { id: 'feed', label: 'Inicio / Feed', icon: Home },
                { id: 'communities', label: 'Comunidades & Muro', icon: Users },
                { id: 'profile', label: 'Mi Perfil Inclusivo', icon: User },
                { id: 'settings', label: 'Accesibilidad & Paz', icon: Shield },
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left ${
                        isActive
                          ? highContrast
                            ? 'bg-yellow-300 text-black font-bold'
                            : 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md font-semibold translate-x-1'
                          : highContrast
                            ? 'text-yellow-300 hover:bg-gray-900'
                            : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 ${isActive ? 'animate-bounce-short' : ''}`} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Tarjeta de Valores de la Red */}
          <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
            highContrast ? 'border-yellow-300 bg-black' : 'bg-pink-100/50 border-pink-200 text-pink-900'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm text-pink-700">
              <Shield className="w-4 h-4" />
              <span>Espacio Seguro Activo</span>
            </div>
            <p className="leading-relaxed">
              En Bloom celebramos la neurodiversidad, la identidad de género libre, la accesibilidad universal y la cero tolerancia al odio. 🌸✨
            </p>
          </div>
        </aside>

        {/* CONTENIDO DE LA PÁGINA (Centro) */}
        <main className="md:col-span-9 space-y-6">

          {/* ================= PÁGINA 1: FEED PRINCIPAL ================= */}
          {activeTab === 'feed' && (
            <div className="space-y-6">

              {/* CREADOR DE POST */}
              <div className={`p-5 rounded-3xl border transition-all ${
                highContrast ? 'bg-black border-yellow-300' : 'bg-white shadow-sm border-pink-200/80'
              }`}>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div className="flex gap-3">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-pink-400"
                    />
                    <div className="flex-1">
                      <textarea
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        placeholder={`¿Qué quieres compartir hoy de forma segura, ${userProfile.name.split(' ')[0]}? 💕`}
                        className={`w-full p-3 rounded-2xl text-sm resize-none outline-none transition-all ${
                          highContrast 
                            ? 'bg-gray-900 border border-yellow-300 text-yellow-300 focus:ring-1 focus:ring-yellow-300' 
                            : 'bg-pink-50/50 border border-pink-100 focus:bg-white focus:ring-2 focus:ring-pink-300 text-gray-800'
                        }`}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Badges de etiquetas del post */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold opacity-80 block">Añade etiquetas de valor/contenido:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {AVAILABLE_TAGS.map((tag) => {
                        const isSelected = newPostTags.includes(tag);
                        return (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => toggleTagSelection(tag)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                              isSelected
                                ? (highContrast ? 'bg-yellow-300 text-black font-bold' : 'bg-pink-500 text-white shadow-sm')
                                : (highContrast ? 'border border-yellow-300 text-yellow-300' : 'bg-pink-50 text-pink-700 hover:bg-pink-100')
                            }`}
                          >
                            {tag} {isSelected ? '✓' : '+'}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Toggle para Content Warning (CW / TW) */}
                  <div className="pt-2 border-t border-pink-100 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCWInput(!showCWInput)}
                      className="text-xs flex items-center gap-1.5 font-semibold text-rose-600 hover:text-rose-700 self-start"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {showCWInput ? 'Quitar advertencia de contenido' : '+ Agregar advertencia de sensible (TW / CW)'}
                    </button>

                    {showCWInput && (
                      <input
                        type="text"
                        placeholder="Ej: Mención de ansiedad, sobreestimulación sensorial..."
                        value={newPostCW}
                        onChange={(e) => setNewPostCW(e.target.value)}
                        className={`p-2 rounded-xl text-xs outline-none ${
                          highContrast 
                            ? 'bg-gray-900 border border-yellow-300 text-yellow-300' 
                            : 'bg-rose-50 border border-rose-200 text-rose-900'
                        }`}
                      />
                    )}
                  </div>

                  {/* Botón publicar */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2 text-pink-500 text-xs">
                      <span className="flex items-center gap-1 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                        <Smile className="w-3.5 h-3.5" /> Expresión Libre
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={!newPostText.trim()}
                      className={`px-5 py-2 rounded-full font-semibold text-sm flex items-center gap-2 transition-all ${
                        !newPostText.trim()
                          ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-600'
                          : highContrast
                            ? 'bg-yellow-300 text-black hover:bg-yellow-400'
                            : 'bg-gradient-to-r from-pink-500 to-rose-400 text-white hover:opacity-95 shadow-md hover:shadow-lg'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      Publicar con Amor
                    </button>
                  </div>
                </form>
              </div>

              {/* BARRA DE FILTROS */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="text-xs font-bold text-gray-500 flex items-center gap-1 pl-1">
                  <Filter className="w-3.5 h-3.5" /> Filtrar:
                </span>
                {['Todos', ...AVAILABLE_TAGS].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTagFilter(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedTagFilter === tag
                        ? highContrast
                          ? 'bg-yellow-300 text-black font-bold'
                          : 'bg-pink-600 text-white shadow'
                        : highContrast
                          ? 'border border-yellow-300 text-yellow-300'
                          : 'bg-white border border-pink-200 text-pink-700 hover:bg-pink-50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* LISTA DE POSTS */}
              <div className="space-y-4">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-3xl border border-pink-100 p-6 space-y-3">
                    <p className="text-pink-600 font-semibold text-lg">No encontramos publicaciones con este filtro 🌸</p>
                    <p className="text-xs text-gray-500">Prueba cambiando los criterios de búsqueda o sé el primero en publicar.</p>
                  </div>
                ) : (
                  filteredPosts.map((post) => {
                    const hasCW = Boolean(post.contentWarning);
                    const isCWRevealed = revealedCWs[post.id] || autoShowCW;

                    return (
                      <article
                        key={post.id}
                        className={`p-5 rounded-3xl border transition-all ${
                          highContrast
                            ? 'bg-black border-yellow-300 text-yellow-300'
                            : 'bg-white border-pink-200/80 shadow-sm hover:shadow-md'
                        }`}
                      >
                        {/* Cabecera Autor */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.avatar}
                              alt={post.author}
                              className="w-10 h-10 rounded-full object-cover border-2 border-pink-300"
                            />
                            <div>
                              <h3 className="font-bold text-sm leading-snug">{post.author}</h3>
                              <p className="text-xs opacity-60">{post.handle} • {post.time}</p>
                            </div>
                          </div>
                        </div>

                        {/* Manejo de Trigger Warning / Advertencia */}
                        {hasCW && !isCWRevealed ? (
                          <div className="p-4 my-2 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-2">
                            <div className="flex items-center justify-center gap-2 text-rose-700 font-bold text-xs">
                              <AlertTriangle className="w-4 h-4" />
                              <span>ADVERTENCIA DE CONTENIDO SENSIBLE (CW)</span>
                            </div>
                            <p className="text-xs text-rose-800">Tema: {post.contentWarning}</p>
                            <button
                              onClick={() => setRevealedCWs({ ...revealedCWs, [post.id]: true })}
                              className="px-4 py-1.5 bg-rose-600 text-white rounded-full text-xs font-semibold hover:bg-rose-700 transition-colors shadow-sm"
                            >
                              Mostrar contenido con cuidado
                            </button>
                          </div>
                        ) : (
                          /* Contenido del post */
                          <div className="space-y-3">
                            {hasCW && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                <AlertTriangle className="w-3 h-3" /> CW: {post.contentWarning}
                              </span>
                            )}
                            <p className="text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 my-3">
                          {post.tags.map(t => (
                            <span key={t} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-pink-50 text-pink-700 border border-pink-100">
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Reacciones */}
                        <div className="pt-3 border-t border-pink-100 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleReaction(post.id, 'like')}
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                                post.hasUserReacted 
                                  ? 'bg-rose-100 text-rose-600 border border-rose-300' 
                                  : 'hover:bg-pink-50 text-gray-600'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${post.hasUserReacted ? 'fill-rose-500 text-rose-500' : ''}`} />
                              <span>{post.likes}</span>
                            </button>

                            <button
                              onClick={() => handleReaction(post.id, 'love')}
                              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold hover:bg-pink-50 text-gray-600 transition-all"
                            >
                              <Sparkles className="w-4 h-4 text-fuchsia-500" />
                              <span>{post.loves}</span>
                            </button>

                            <button
                              onClick={() => handleReaction(post.id, 'support')}
                              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold hover:bg-pink-50 text-gray-600 transition-all"
                            >
                              <Coffee className="w-4 h-4 text-pink-500" />
                              <span>{post.supports} Abrazo</span>
                            </button>
                          </div>

                          <span className="text-xs opacity-60">{post.comments.length} comentarios</span>
                        </div>

                        {/* Sección de comentarios simples */}
                        <div className="mt-4 pt-3 border-t border-pink-50 space-y-2">
                          {post.comments.map(c => (
                            <div key={c.id} className="p-2.5 rounded-2xl bg-pink-50/50 text-xs space-y-1">
                              <span className="font-bold text-pink-800">{c.author}</span>
                              <p className="text-gray-700">{c.text}</p>
                            </div>
                          ))}

                          {/* Campo agregar comentario */}
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const text = e.target.elements.comment.value;
                              handleAddComment(post.id, text);
                              e.target.reset();
                            }}
                            className="flex gap-2 pt-1"
                          >
                            <input
                              name="comment"
                              type="text"
                              placeholder="Escribe un comentario respetuoso y con amor..."
                              className="flex-1 px-3 py-1.5 rounded-full text-xs border border-pink-200 outline-none focus:ring-1 focus:ring-pink-400 bg-white"
                            />
                            <button type="submit" className="px-3 py-1.5 bg-pink-500 text-white rounded-full text-xs font-semibold hover:bg-pink-600 transition-colors">
                              Enviar
                            </button>
                          </form>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ================= PÁGINA 2: COMUNIDADES & MURO DE AFIRMACIONES ================= */}
          {activeTab === 'communities' && (
            <div className="space-y-8">
              
              {/* SECCIÓN MURO DE AFIRMACIONES VIRTUAL */}
              <div className={`p-6 rounded-3xl border ${
                highContrast ? 'bg-black border-yellow-300' : 'bg-gradient-to-br from-pink-100/80 via-purple-50 to-rose-100/60 border-pink-200'
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-black text-pink-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-pink-600" />
                      Muro de Afirmaciones Positivas
                    </h2>
                    <p className="text-xs text-pink-700">Deja una nota adhesiva de apoyo o toma una dosis de buena vibra para tu día. 🌸</p>
                  </div>
                </div>

                {/* Form para nueva afirmación */}
                <form onSubmit={handleAddAffirmation} className="mb-6 p-4 bg-white/90 rounded-2xl border border-pink-200 space-y-3">
                  <input
                    type="text"
                    placeholder="Escribe un mensaje bonito para la comunidad (Ej: Recordatorio: Eres magia ✨)..."
                    value={newAffirmationText}
                    onChange={(e) => setNewAffirmationText(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs border border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      placeholder="Tu nombre o firmatario (Opcional)"
                      value={newAffirmationAuthor}
                      onChange={(e) => setNewAffirmationAuthor(e.target.value)}
                      className="px-3 py-1.5 rounded-xl text-xs border border-pink-200 outline-none w-1/2"
                    />
                    <button
                      type="submit"
                      disabled={!newAffirmationText.trim()}
                      className="px-4 py-1.5 bg-pink-600 text-white rounded-full text-xs font-bold hover:bg-pink-700 transition-colors"
                    >
                      Pegar Nota 📌
                    </button>
                  </div>
                </form>

                {/* Grid de notas adhesivas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {affirmations.map((aff) => (
                    <div
                      key={aff.id}
                      className={`p-4 rounded-2xl border-2 shadow-sm transform hover:-translate-y-1 transition-all space-y-2 ${aff.color}`}
                    >
                      <p className="font-semibold text-sm italic">"{aff.text}"</p>
                      <p className="text-right text-[11px] font-bold opacity-80">— {aff.author}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* GRUPOS DE APOYO / COMUNIDADES */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Users className="w-5 h-5 text-pink-500" />
                  Comunidades & Espacios Seguros
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COMMUNITIES.map((comm) => (
                    <div
                      key={comm.id}
                      className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-3 ${
                        highContrast 
                          ? 'bg-black border-yellow-300 text-yellow-300' 
                          : 'bg-white border-pink-200/80 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{comm.icon}</span>
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-pink-100 text-pink-800 border border-pink-200">
                            {comm.members}
                          </span>
                        </div>
                        <h3 className="font-bold text-base text-pink-900">{comm.name}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">{comm.desc}</p>
                      </div>

                      <button className="w-full py-2 bg-pink-50 text-pink-700 hover:bg-pink-500 hover:text-white border border-pink-200 font-bold rounded-2xl text-xs transition-colors">
                        Unirme al Espacio 🌸
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= PÁGINA 3: PERFIL INCLUSIVO ================= */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* Tarjeta Principal de Perfil */}
              <div className={`rounded-3xl border overflow-hidden ${
                highContrast ? 'bg-black border-yellow-300' : 'bg-white border-pink-200 shadow-sm'
              }`}>
                {/* Banner personalizable */}
                <div className={`h-32 bg-gradient-to-r ${userProfile.bannerColor} relative`}>
                  <div className="absolute right-4 bottom-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-pink-800">
                    Tema Rosa Seleccionado ✨
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 relative">
                  {/* Avatar y Datos Basicos */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 mb-4 gap-4">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    
                    <div className="flex gap-2">
                      <button className="px-4 py-1.5 rounded-full border border-pink-300 text-pink-700 font-bold text-xs hover:bg-pink-50 transition-colors">
                        Editar Perfil
                      </button>
                      <button 
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className={`px-4 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all ${
                          isPlayingAudio 
                            ? 'bg-rose-600 text-white animate-pulse' 
                            : 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        {isPlayingAudio ? 'Reproduciendo Intro...' : 'Escuchar Intro de Voz 🎙️'}
                      </button>
                    </div>
                  </div>

                  {/* Nombre y Pronombres */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-black text-gray-900">{userProfile.name}</h2>
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-pink-700 border border-pink-200">
                        {userProfile.pronouns}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">{userProfile.handle}</p>
                    <p className="text-sm text-gray-700 leading-relaxed pt-1">{userProfile.bio}</p>
                  </div>

                  {/* Insignias de Identidad */}
                  <div className="mt-5 pt-4 border-t border-pink-100 space-y-2">
                    <span className="text-xs font-bold text-gray-500 block">Insignias & Comunidad:</span>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-50 to-rose-50 text-pink-800 border border-pink-200 shadow-2xs"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Publicaciones del Perfil */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-600 flex items-center gap-2">
                  <Feather className="w-4 h-4 text-pink-500" />
                  Publicaciones de {userProfile.name.split(' ')[0]}
                </h3>

                {posts.filter(p => p.handle === userProfile.handle).length === 0 ? (
                  <p className="text-xs text-gray-500 italic p-4 bg-white rounded-2xl border text-center">Aún no has publicado hoy. ¡Comparte tus pensamientos arriba! 🌸</p>
                ) : (
                  posts.filter(p => p.handle === userProfile.handle).map(post => (
                    <div key={post.id} className="p-4 bg-white rounded-2xl border border-pink-200 space-y-2 text-sm">
                      <p className="text-gray-800">{post.content}</p>
                      <div className="text-[11px] text-pink-600 font-semibold">{post.time} • {post.likes} Reacciones</div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* ================= PÁGINA 4: AJUSTES DE ACCESIBILIDAD ================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className={`p-6 rounded-3xl border ${
                highContrast ? 'bg-black border-yellow-300' : 'bg-white border-pink-200 shadow-sm'
              }`}>
                <h2 className="text-lg font-black text-pink-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-pink-600" />
                  Centro de Accesibilidad & Inclusión
                </h2>
                <p className="text-xs text-gray-600 mb-6">
                  Personaliza cómo ves e interactúas con la red para garantizar una experiencia cómoda, segura y adaptada a tus necesidades.
                </p>

                <div className="space-y-6">

                  {/* Contraste */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-pink-50/50 border border-pink-100">
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">Modo Alto Contraste</h4>
                      <p className="text-xs text-gray-500">Aumenta los niveles de visión para reducir la fatiga visual.</p>
                    </div>
                    <button
                      onClick={() => setHighContrast(!highContrast)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        highContrast ? 'bg-yellow-300 text-black' : 'bg-pink-600 text-white'
                      }`}
                    >
                      {highContrast ? 'Activado ☀️' : 'Desactivado 🌙'}
                    </button>
                  </div>

                  {/* Fuente dislexia */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-pink-50/50 border border-pink-100">
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">Tipografía para Lectura Fácil (Dyslexia Friendly)</h4>
                      <p className="text-xs text-gray-500">Usa una tipografía con espaciado optimizado para facilitar la lectura.</p>
                    </div>
                    <button
                      onClick={() => setDyslexicFont(!dyslexicFont)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        dyslexicFont ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-800'
                      }`}
                    >
                      {dyslexicFont ? 'Activado 📖' : 'Desactivado'}
                    </button>
                  </div>

                  {/* Escala de Fuente */}
                  <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-3">
                    <h4 className="font-bold text-sm text-gray-800">Tamaño del Texto Global</h4>
                    <div className="flex gap-2">
                      {[
                        { id: 'normal', label: 'Normal' },
                        { id: 'large', label: 'Grande' },
                        { id: 'xlarge', label: 'Muy Grande' }
                      ].map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setFontSize(size.id)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                            fontSize === size.id 
                              ? 'bg-pink-600 text-white border-pink-600' 
                              : 'bg-white text-gray-700 border-pink-200'
                          }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mostrar Automáticamente CW */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-pink-50/50 border border-pink-100">
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">Revelar Advertencias de Contenido (CW)</h4>
                      <p className="text-xs text-gray-500">Muestra siempre el contenido oculto sin requerir clic.</p>
                    </div>
                    <button
                      onClick={() => setAutoShowCW(!autoShowCW)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        autoShowCW ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-800'
                      }`}
                    >
                      {autoShowCW ? 'Revelar Siempre' : 'Ocultar Sensibles'}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* FOOTER ACCESIBLE */}
      <footer className="mt-12 py-6 border-t border-pink-200 text-center text-xs text-pink-700 font-medium">
        <p>Bloom ✨ Pink Space — Construida con empatía, accesibilidad y diversidad en mente. 🌸💖</p>
      </footer>

    </div>
  );
}