import React, { useState } from 'react';
import { Book, ChevronRight, PlayCircle, GraduationCap, Layout, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

// Types
type Subject = {
  id: number;
  name: string;
  color: string;
  icon: string;
  topics: Topic[];
};

type Topic = {
  id: number;
  title: string;
  content: Content[];
  quiz: Quiz[];
};

type Content = {
  id: number;
  type: 'text' | 'video';
  title: string;
  data: string;
};

type Quiz = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

// Mock data
const subjects: Subject[] = [
  {
    id: 1,
    name: 'Matemática',
    color: 'bg-yellow-500',
    icon: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=200&h=200&auto=format&fit=crop',
    topics: [
      {
        id: 1,
        title: 'Álgebra Básica',
        content: [
          {
            id: 1,
            type: 'text',
            title: 'Introdução à Álgebra',
            data: 'A álgebra é um ramo da matemática que estuda a manipulação de equações e expressões matemáticas usando números, letras e símbolos. É fundamental para resolver problemas complexos e é aplicada em diversas áreas do conhecimento.'
          },
          {
            id: 2,
            type: 'video',
            title: 'Operações Algébricas Básicas',
            data: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          }
        ],
        quiz: [
          {
            id: 1,
            question: 'Qual é o resultado de 2x + 3 quando x = 2?',
            options: ['5', '7', '8', '4'],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'História',
    color: 'bg-brown-500',
    icon: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=200&h=200&auto=format&fit=crop',
    topics: [
      {
        id: 1,
        title: 'História Antiga',
        content: [
          {
            id: 1,
            type: 'text',
            title: 'Civilizações Antigas',
            data: 'As primeiras civilizações surgiram em diferentes partes do mundo, principalmente próximas a grandes rios. Egito, Mesopotâmia, Vale do Indo e China são exemplos dessas civilizações antigas.'
          }
        ],
        quiz: [
          {
            id: 1,
            question: 'Qual civilização antiga se desenvolveu às margens do Rio Nilo?',
            options: ['Grécia', 'Roma', 'Egito', 'Pérsia'],
            correctAnswer: 2
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Geografia',
    color: 'bg-orange-500',
    icon: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=200&h=200&auto=format&fit=crop',
    topics: [
      {
        id: 1,
        title: 'Cartografia',
        content: [
          {
            id: 1,
            type: 'text',
            title: 'Elementos de um Mapa',
            data: 'Os elementos fundamentais de um mapa incluem título, legenda, escala, orientação (rosa dos ventos) e fonte. Cada um desses elementos tem uma função específica na leitura e interpretação cartográfica.'
          }
        ],
        quiz: [
          {
            id: 1,
            question: 'Qual elemento do mapa indica a proporção entre a representação e o tamanho real?',
            options: ['Legenda', 'Escala', 'Título', 'Rosa dos ventos'],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Biologia',
    color: 'bg-green-500',
    icon: 'https://images.unsplash.com/photo-1532634993-15f421e42ec0?q=80&w=200&h=200&auto=format&fit=crop',
    topics: [
      {
        id: 1,
        title: 'Células',
        content: [
          {
            id: 1,
            type: 'text',
            title: 'Estrutura Celular',
            data: 'A célula é a unidade básica da vida. Ela contém diferentes organelas, cada uma com funções específicas. As principais estruturas incluem núcleo, citoplasma e membrana plasmática.'
          }
        ],
        quiz: [
          {
            id: 1,
            question: 'Qual organela é responsável pela produção de energia na célula?',
            options: ['Mitocôndria', 'Núcleo', 'Ribossomo', 'Golgi'],
            correctAnswer: 0
          }
        ]
      }
    ]
  }
];

function App() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleAnswerSubmit = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setIsAnswerCorrect(answerIndex === selectedTopic?.quiz[currentQuizIndex].correctAnswer);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center">
          <GraduationCap className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">EduPlataforma</h1>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button 
            onClick={() => {
              setSelectedSubject(null);
              setSelectedTopic(null);
              resetQuiz();
            }}
            className="hover:text-indigo-600"
          >
            Início
          </button>
          {selectedSubject && (
            <>
              <ChevronRight className="w-4 h-4" />
              <button 
                onClick={() => {
                  setSelectedTopic(null);
                  resetQuiz();
                }}
                className="hover:text-indigo-600"
              >
                {selectedSubject.name}
              </button>
            </>
          )}
          {selectedTopic && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span>{selectedTopic.title}</span>
            </>
          )}
        </div>

        {/* Content */}
        {!selectedSubject ? (
          // Subjects Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject)}
                className={`${subject.color} p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-white`}
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={subject.icon} 
                    alt={subject.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h2 className="text-xl font-semibold">{subject.name}</h2>
                    <p className="opacity-90">{subject.topics.length} tópicos</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : !selectedTopic ? (
          // Topics List
          <div className="bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className={`text-2xl font-bold p-6 border-b border-gray-100 ${selectedSubject.color} text-white rounded-t-lg`}>
              {selectedSubject.name}
            </h2>
            <div className="divide-y divide-gray-100">
              {selectedSubject.topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{topic.title}</h3>
                    <p className="text-gray-600">{topic.content.length} conteúdos • {topic.quiz.length} quiz</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        ) : !showQuiz ? (
          // Topic Content
          <div className="bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold p-6 border-b border-gray-100">
              {selectedTopic.title}
            </h2>
            <div className="divide-y divide-gray-100">
              {selectedTopic.content.map((content) => (
                <div key={content.id} className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {content.type === 'video' ? (
                      <PlayCircle className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <Layout className="w-5 h-5 text-indigo-600" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-800">
                      {content.title}
                    </h3>
                  </div>
                  {content.type === 'video' ? (
                    <div className="aspect-video">
                      <iframe
                        src={content.data}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                        title={content.title}
                      />
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {content.data}
                    </p>
                  )}
                </div>
              ))}
              <div className="p-6">
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Iniciar Quiz
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Quiz
          <div className="bg-white rounded-lg shadow-md border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold">Quiz: {selectedTopic.title}</h2>
              <p className="text-gray-600">Questão {currentQuizIndex + 1} de {selectedTopic.quiz.length}</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-6">
                {selectedTopic.quiz[currentQuizIndex].question}
              </h3>
              <div className="space-y-3">
                {selectedTopic.quiz[currentQuizIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSubmit(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-lg border text-left transition-colors ${
                      selectedAnswer === null
                        ? 'hover:bg-gray-50'
                        : selectedAnswer === index
                        ? isAnswerCorrect
                          ? 'bg-green-100 border-green-500'
                          : 'bg-red-100 border-red-500'
                        : index === selectedTopic.quiz[currentQuizIndex].correctAnswer && selectedAnswer !== null
                        ? 'bg-green-100 border-green-500'
                        : 'opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {selectedAnswer === index && (
                        isAnswerCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )
                      )}
                      {index === selectedTopic.quiz[currentQuizIndex].correctAnswer && selectedAnswer !== null && selectedAnswer !== index && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Tentar Novamente
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;