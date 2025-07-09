export type CourseKey = 'foundations' | 'discipleship' | 'ministry';

export type Lesson = {
  id: string;
  number: number;
  slug: string;
  title: string;
  noteUrl?: string;
  videoUrl?: string;
  status?: boolean;
};

export type CourseData = {
  title: string;
  description: string;
  about: string;
  bgColor: string;
  badgeColor: string;
  bgImage: string;
  thumbnail: string;
  totalLessons: number;
  totalDuration: string;
  lessons: Lesson[];
};

export const CourseRouteInfo = {
  foundations: {
    title: 'Foundations',
    description:
      'Start your journey with core teachings on salvation, prayer, and Scripture.',
    about: `The Foundations of the Faith course is designed to help you build your walk with Jesus on solid, unshakable ground. In a world full of spiritual confusion, distractions, and cultural compromise, believers need a clear and biblical foundation.

Whether you're a new believer or someone who's been in the faith, this course guides you through the essentials of the Christian life. It's not just knowledge; it's heart transformation.`,
    bgColor: '',
    badgeColor: 'bg-[#602F1E]',
    bgImage: 'backfill',
    thumbnail: '/images/sample-video-thumbnail.jpg',
    totalLessons: 15,
    totalDuration: '6 hours and 24 minutes',
    lessons: [
      {
        id: 'f-1',
        number: 1,
        slug: 'christ-our-foundation',
        title: 'Christ Our Foundation.',
        noteUrl: '/notes/foundations/lesson1.pdf',
        videoUrl: 'https://video.url/lesson1',
        status: false,
      },
      {
        id: 'f-2',
        number: 2,
        slug: 'salvation-repentance-and-belief',
        title: 'Salvation, Repentance And Belief.',
        noteUrl: '/notes/foundations/lesson2.pdf',
        videoUrl: 'https://video.url/lesson2',
        status: true,
      },
      {
        id: 'f-3',
        number: 3,
        slug: 'can-a-christian-lose-salvation-part-1',
        title: 'Can A Christian Lose Their Salvation (Part 1).',
        noteUrl: '/notes/foundations/lesson3.pdf',
        videoUrl: 'https://video.url/lesson3',
        status: true,
      },
      {
        id: 'f-4',
        number: 4,
        slug: 'can-a-christian-lose-salvation-part-2',
        title: 'Can A Christian Lose Their Salvation (Part 2).',
        noteUrl: '/notes/foundations/lesson4.pdf',
        videoUrl: 'https://video.url/lesson4',
        status: true,
      },
      {
        id: 'f-5',
        number: 5,
        slug: 'five-tests-of-true-salvation',
        title: 'Five Tests of True Salvation',
        noteUrl: '/notes/foundations/lesson5.pdf',
        videoUrl: 'https://video.url/lesson5',
        status: true,
      },
      {
        id: 'f-6',
        number: 6,
        slug: 'you-are-spirit',
        title: 'You Are Spirit / Your Spirit Is Sinless.',
        noteUrl: '/notes/foundations/lesson6.pdf',
        videoUrl: 'https://video.url/lesson6',
        status: true,
      },
      {
        id: 'f-7',
        number: 7,
        slug: 'how-to-walk-in-the-spirit',
        title: 'How To Walk In The Spirit.',
        noteUrl: '/notes/foundations/lesson7.pdf',
        videoUrl: 'https://video.url/lesson7',
        status: true,
      },
      {
        id: 'f-8',
        number: 8,
        slug: 'the-living-word',
        title: 'The Living Word.',
        noteUrl: '/notes/foundations/lesson8.pdf',
        videoUrl: 'https://video.url/lesson8',
        status: true,
      },
      {
        id: 'f-9',
        number: 9,
        slug: 'how-scriptures-were-written',
        title: 'How The Scriptures Were Written And Compiled.',
        noteUrl: '/notes/foundations/lesson9.pdf',
        videoUrl: 'https://video.url/lesson9',
        status: true,
      },
    ],
  },

  discipleship: {
    title: 'Discipleship',
    description: 'Learn to follow Jesus daily with obedience and intimacy.',
    about: `Discipleship is about becoming more like Jesus. This course equips believers with biblical instruction on spiritual maturity, discipline, and accountability in community. You’ll learn how to practically walk out your faith in everyday life.`,
    bgColor: '',
    badgeColor: 'bg-[#1B5E20]',
    bgImage: 'backfilDisp',
    thumbnail: '/images/sample-video-thumbnail.jpg',
    totalLessons: 12,
    totalDuration: '6 hours',
    lessons: [
      {
        id: 'd-1',
        number: 1,
        slug: 'the-cost-of-discipleship',
        title: 'The Cost of Discipleship',
        noteUrl: '/notes/discipleship/lesson1.pdf',
        videoUrl: 'https://video.url/discipleship1',
        status: true,
      },
    ],
  },

  ministry: {
    title: 'Ministry',
    description:
      'Discover your calling and how to serve effectively in the body of Christ.',
    about: `This course introduces you to the biblical purpose of ministry, how to serve in humility, and the practical aspects of leading others in the body of Christ. From discovering your calling to operating in your gifting, you'll be equipped to walk worthy of your calling.`,
    bgColor: 'bg-[#9C27B0]',
    badgeColor: 'bg-[#6A1B9A]',
    bgImage: 'backfillMin',
    thumbnail: '/images/sample-video-thumbnail.jpg',
    totalLessons: 10,
    totalDuration: '5 hours',
    lessons: [
      {
        id: 'm-1',
        number: 1,
        slug: 'understanding-your-calling',
        title: 'Understanding Your Calling',
        noteUrl: '/notes/ministry/lesson1.pdf',
        videoUrl: 'https://video.url/ministry1',
        status: true,
      },
    ],
  },
} satisfies Record<CourseKey, CourseData>;
