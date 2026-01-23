import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube URL',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https'],
        allowRelative: false,
      }).custom((url) => {
        if (!url || typeof url !== 'string') return true;
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        return youtubeRegex.test(url) ? true : 'Must be a valid YouTube URL';
      }),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Video Title (optional)',
      description: 'Optional title for the video embed',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      title: 'title',
    },
    prepare({ url, title }) {
      // Extract video ID from URL
      let videoId = '';
      if (url) {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        videoId = match ? match[1] : '';
      }
      
      return {
        title: title || 'YouTube Video',
        subtitle: url || 'No URL',
      };
    },
  },
});
