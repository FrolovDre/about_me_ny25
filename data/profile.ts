export type Language = 'ru' | 'en';

type Project = {
  title: string;
  status: string;
  problem: string;
  action: string;
  result: string;
  details: string;
  tags: string[];
};

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

type EducationItem = {
  title: string;
  detail: string;
  period: string;
};

type Profile = {
  name: string;
  role: string;
  summary: string[];
  location: string;
  email: string;
  github: string;
  lookingForLabel: string;
  lookingFor: string;
  cta: {
    label: string;
    href: string;
  };
  tabs: {
    projects: string;
    experience: string;
    skills: string;
    education: string;
  };
  projects: Project[];
  experience: ExperienceItem[];
  skills: {
    product: string[];
    process: string[];
    analytics: string[];
    tools: string[];
  };
  education: EducationItem[];
  languages: string[];
  labels: {
    projectsStatus: string;
    problem: string;
    action: string;
    result: string;
    more: string;
    less: string;
    product: string;
    process: string;
    analytics: string;
    tools: string;
    languages: string;
    links: string;
  };
};

const shared = {
  email: '5rolov.a9dr8y@gmail.com',
  github: 'https://github.com/FrolovDre/about_me_ny25'
};

export const profiles: Record<Language, Profile> = {
  ru: {
    name: 'Андрей Фролов',
    role: 'Product Manager / Project Manager',
    summary: [
      'Выпускник МГУ, магистратура НИУ ВШЭ (бизнес-информатика / цифровые инновации).',
      'Интерес: продукт + аналитика + AI.',
      'Опыт в Agile и end-to-end цикле продукта.'
    ],
    location: 'Москва',
    email: shared.email,
    github: shared.github,
    lookingForLabel: 'Что ищу',
    lookingFor: 'Стажировка / Junior Product, full-time, Москва.',
    cta: {
      label: 'Скачать CV',
      href: '/CV.pdf'
    },
    tabs: {
      projects: 'Проекты',
      experience: 'Опыт',
      skills: 'Навыки',
      education: 'Образование'
    },
    projects: [
      {
        title: 'AI assistant for product research',
        status: 'RAG',
        problem: 'Долго собирать и синтезировать исследования.',
        action: 'Собрал KPI, Lean Canvas, roadmap + data plan.',
        result: 'Определён MVP и путь валидации.',
        details:
          'Benchmarked Wokelo AI, описал метрики (Time-to-Report, Coverage, Adoption, LLM-cost) и архитектуру с Weaviate и multi-LLM stack.',
        tags: ['Product Research', 'AI', 'Weaviate', 'LLM']
      },
      {
        title: 'IVI mini-dramas for Gen Z',
        status: 'Case',
        problem: 'Нужно найти рост для формата Gen Z.',
        action: 'Market sizing, инсайты, промо-стратегия.',
        result: 'Собрана GTM-гипотеза для теста.',
        details:
          'Спрогнозировал метрики и расходы, упаковал сценарий запуска и KPI-модель.',
        tags: ['Go-to-Market', 'Analytics', 'Strategy']
      },
      {
        title: 'Aviasales loyalty mechanics',
        status: 'Case',
        problem: 'Низкая ретенция без loyalty-механик.',
        action: 'Бенчмарк 25+ программ, сегментация.',
        result: 'Приоритизировал механики и KPI-модель.',
        details:
          'Проработал влияние на LTV/Retention и список экспериментов для пилота.',
        tags: ['Retention', 'Benchmarking', 'Metrics']
      },
      {
        title: 'MVP movie подборщик',
        status: 'MVP',
        problem: 'Выбор фильма занимает слишком много времени.',
        action: 'JTBD, метрики, прототип в Figma.',
        result: 'Готовый MVP-скоуп для discovery.',
        details:
          'Собрал дерево метрик и план экспериментов для быстрой проверки ценности.',
        tags: ['MVP', 'JTBD', 'Figma']
      },
      {
        title: 'Островок: монетизация',
        status: 'Case',
        problem: 'Нужно расширить монетизацию.',
        action: 'CJM + 3 механики монетизации.',
        result: 'Сформирован пул экспериментов.',
        details:
          'Связал механики с юнит-экономикой и промо-планом.',
        tags: ['Monetization', 'CJM', 'Growth']
      }
    ],
    experience: [
      {
        role: 'Руководитель проектов',
        company: 'IBS',
        period: '09.2024–н.в.',
        bullets: [
          'Планирование, таймшиты, управление рисками и поручениями.',
          'Jira/Confluence/MS Project/SharePoint, PMO, протоколы и статус-презентации.',
          'RAG AI-ассистент, автоматизация Confluence, интеграция Confluence–Jira + Scroll.',
          'Перевод апдейтов в async, ускорение онбординга, отчеты/дашборды.',
          'Снижение просрочек поручений.'
        ]
      },
      {
        role: 'Руководитель проектов / Event-менеджер',
        company: 'Туристский комплекс “Клязьминское водохранилище”',
        period: '05.2023–08.2024',
        bullets: [
          'Договоры, координация подразделений, бюджетирование.',
          'Рекрутинг 20+ кандидатов.',
          'Организация 2 крупных мероприятий.'
        ]
      },
      {
        role: 'Ассистент рекрутера',
        company: 'Get Experts',
        period: '07.2023–08.2023',
        bullets: ['Скрининг кандидатов, обзвоны, приглашения.']
      },
      {
        role: 'Практикант HR',
        company: 'Норникель',
        period: '06.2022',
        bullets: [
          'Тест по культуре, образовательная программа, задачи.',
          'База ССУЗов.'
        ]
      }
    ],
    skills: {
      product: [
        'Discovery',
        'Benchmarking',
        'JTBD',
        'Roadmap',
        'Metrics tree',
        'Unit economics',
        'Go-to-market'
      ],
      process: [
        'Agile / Kanban',
        'Planning',
        'Risks',
        'Stakeholder comms',
        'Documentation'
      ],
      analytics: [
        'Market research',
        'Customer insights',
        'CJM',
        'KPI modeling',
        'Basic SQL'
      ],
      tools: [
        'Jira',
        'Confluence',
        'MS Project',
        'SharePoint',
        'Figma',
        'Miro',
        'Visiology',
        'GitHub'
      ]
    },
    education: [
      {
        title: 'МГУ',
        detail: 'Управление персоналом',
        period: '2024'
      },
      {
        title: 'НИУ ВШЭ',
        detail: 'Бизнес-информатика (магистратура)',
        period: '2026'
      },
      {
        title: 'Курсы IBS',
        detail:
          'Управление ИТ-проектами, коммуникации, риски/изменения, требования, Confluence/Jira, промптинг и др.',
        period: '2024–2025'
      },
      {
        title: 'Электронные сертификаты',
        detail:
          'Process Communication Model; “Управление проектами в современной компании”.',
        period: ''
      }
    ],
    languages: ['Русский (родной)', 'Английский B2'],
    labels: {
      projectsStatus: 'Статус',
      problem: 'Проблема',
      action: 'Действие',
      result: 'Результат',
      more: 'Подробнее',
      less: 'Свернуть',
      product: 'Продукт',
      process: 'PM / Процессы',
      analytics: 'Аналитика / Исследования',
      tools: 'Инструменты',
      languages: 'Языки',
      links: 'Ссылки'
    }
  },
  en: {
    name: 'Andrey Frolov',
    role: 'Product Manager / Project Manager',
    summary: [
      'MSU graduate; HSE master’s student (business informatics / digital innovation).',
      'Interest: product + analytics + AI.',
      'Experience with Agile and end-to-end product cycles.'
    ],
    location: 'Moscow',
    email: shared.email,
    github: shared.github,
    lookingForLabel: 'Looking for',
    lookingFor: 'Internship / Junior Product, full-time, Moscow.',
    cta: {
      label: 'Download CV',
      href: '/CV.pdf'
    },
    tabs: {
      projects: 'Projects',
      experience: 'Experience',
      skills: 'Skills',
      education: 'Education'
    },
    projects: [
      {
        title: 'AI assistant for product research',
        status: 'RAG',
        problem: 'Research synthesis is too slow.',
        action: 'Defined KPIs, Lean Canvas, roadmap + data plan.',
        result: 'Clear MVP scope and validation path.',
        details:
          'Benchmarked Wokelo AI, set metrics (Time-to-Report, Coverage, Adoption, LLM-cost) and designed Weaviate + multi-LLM stack.',
        tags: ['Product Research', 'AI', 'Weaviate', 'LLM']
      },
      {
        title: 'IVI mini-dramas for Gen Z',
        status: 'Case',
        problem: 'Need a growth angle for Gen Z format.',
        action: 'Market sizing, insights, promo strategy.',
        result: 'GTM hypothesis ready for testing.',
        details:
          'Forecasted metrics and costs, packaged a launch scenario and KPI model.',
        tags: ['Go-to-Market', 'Analytics', 'Strategy']
      },
      {
        title: 'Aviasales loyalty mechanics',
        status: 'Case',
        problem: 'Retention is weak without loyalty mechanics.',
        action: 'Benchmarked 25+ programs, segmentation.',
        result: 'Prioritized mechanics and KPI model.',
        details:
          'Mapped impact on LTV/Retention and an experiment list for pilots.',
        tags: ['Retention', 'Benchmarking', 'Metrics']
      },
      {
        title: 'MVP movie picker',
        status: 'MVP',
        problem: 'Decision fatigue when choosing a movie.',
        action: 'JTBD, metrics tree, Figma prototype.',
        result: 'Ready MVP scope for discovery.',
        details:
          'Defined a metrics tree and fast experiments to validate value.',
        tags: ['MVP', 'JTBD', 'Figma']
      },
      {
        title: 'Ostrovok: monetization',
        status: 'Case',
        problem: 'Need to expand monetization options.',
        action: 'CJM + 3 monetization mechanics.',
        result: 'Experiment pipeline mapped.',
        details:
          'Linked mechanics to unit economics and promo plan.',
        tags: ['Monetization', 'CJM', 'Growth']
      }
    ],
    experience: [
      {
        role: 'Project Manager',
        company: 'IBS',
        period: '09.2024–Present',
        bullets: [
          'Planning, timesheets, risk management, and task tracking.',
          'Jira/Confluence/MS Project/SharePoint, PMO, protocols, and status decks.',
          'RAG AI assistant, Confluence automation, Confluence–Jira + Scroll integration.',
          'Async updates, faster onboarding, reports/dashboards.',
          'Reduced overdue tasks.'
        ]
      },
      {
        role: 'Project Manager / Event Manager',
        company: 'Klyazma Reservoir Tourist Complex',
        period: '05.2023–08.2024',
        bullets: [
          'Contracts, cross-team coordination, budgeting.',
          'Recruited 20+ candidates.',
          'Organized 2 large events.'
        ]
      },
      {
        role: 'Recruiting Assistant',
        company: 'Get Experts',
        period: '07.2023–08.2023',
        bullets: ['Candidate screening, calls, interview scheduling.']
      },
      {
        role: 'HR Intern',
        company: 'Nornickel',
        period: '06.2022',
        bullets: ['Culture test, training program, tasks.', 'VET school database.']
      }
    ],
    skills: {
      product: [
        'Discovery',
        'Benchmarking',
        'JTBD',
        'Roadmap',
        'Metrics tree',
        'Unit economics',
        'Go-to-market'
      ],
      process: [
        'Agile / Kanban',
        'Planning',
        'Risks',
        'Stakeholder comms',
        'Documentation'
      ],
      analytics: [
        'Market research',
        'Customer insights',
        'CJM',
        'KPI modeling',
        'Basic SQL'
      ],
      tools: [
        'Jira',
        'Confluence',
        'MS Project',
        'SharePoint',
        'Figma',
        'Miro',
        'Visiology',
        'GitHub'
      ]
    },
    education: [
      {
        title: 'Moscow State University',
        detail: 'Human Resource Management',
        period: '2024'
      },
      {
        title: 'HSE University',
        detail: 'Business Informatics (Master’s)',
        period: '2026'
      },
      {
        title: 'IBS Courses',
        detail:
          'IT project management, communications, risks/changes, requirements, Confluence/Jira, prompting, and more.',
        period: '2024–2025'
      },
      {
        title: 'Certificates',
        detail:
          'Process Communication Model; “Project Management in a Modern Company”.',
        period: ''
      }
    ],
    languages: ['Russian (native)', 'English B2'],
    labels: {
      projectsStatus: 'Status',
      problem: 'Problem',
      action: 'Action',
      result: 'Result',
      more: 'Read more',
      less: 'Collapse',
      product: 'Product',
      process: 'PM / Process',
      analytics: 'Analytics / Research',
      tools: 'Tools',
      languages: 'Languages',
      links: 'Links'
    }
  }
};
