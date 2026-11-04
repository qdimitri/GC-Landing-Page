export type Review = {
  name: string
  date: string
  rating: number
  text: string
  companyReplied: boolean
}

// SAMPLE DATA: replace with real Trustpilot reviews.
// Only reviews rated 4 stars or higher are shown.
export const reviews: Review[] = [
  {
    name: 'Lee',
    date: 'Oct 8, 2026',
    rating: 5,
    text: 'Sheri Hamilton was on FIRE on the 10X Mentor call today!  If you need a kick in the tail to get your business in shape, you MUST be part of the 10X ecosystem!  We’ve grown our personal & business revenues by over 40% since  joining 2.5 years ago.  Invaluable information & the network is priceless!!',
    companyReplied: true,
  },
  {
    name: 'Kathleen F.',
    date: 'Oct 3, 2026',
    rating: 5,
    text: 'I joined Cardone Trainging about 3 months and I am blown away at how great they are! If you are wanting to increase your income, learn how to invest in multi family, individual coaching or a litany of other things! This is the place to be! Their people are nice, professional and knowledgeable. My sales person/ account manager, Reese, is the absolute BEST!!! Do yourself a favor and attend a FREE training or give them a call today! ',
    companyReplied: false,
  },
  {
    name: 'Marilyn T.',
    date: 'Sep 27, 2026',
    rating: 4.7,
    text: 'Every training Ive been in from Cardone Training Technologies, free or paid, has been excellent in terms of presentation, knowledge transferred and actionable strategies that I can put to use immediately. Marketing Essentials was no exception. Every question answered was done in a way that would provide value to the person asking, as well as for the group. A great value for the investment. Its not just theory, its practical, proven strategies that they use themselves. Highly recommend.',
    companyReplied: true,
  },
  {
    name: 'RISHA',
    date: 'Sep 19, 2026',
    rating: 5,
    text: 'Cardone training is a must do for anyone wanting to succeed in life. business or success. I have never been disappointed with any products that I’ve purchased or been granted access to through their training technologies. All I say to myself is how could I not have this in my life? What would I be missing out on?',
    companyReplied: false,
  },
  {
    name: 'Bruce J.',
    date: 'Sep 12, 2026',
    rating: 5,
    text: 'Company is engaging and responsive. From my perspective in IT, this appears to be a crowd sourced community of real estate enthusiasts with a bias in sales and marketing. If one is used to the sales and marketing chatter, one will feel right at home here. For me theres an adjustment in the culture, yet Im here as a perpetual student to learn. Thank you, Cardone team for this opportunity. Ive been a bit shy to join in the process over the last two years; taking baby steps as I see how people behave and what they do. Im in it now for the long term and really appreciate all that Im learning.',
    companyReplied: false,
  },
]
