export const enum AddReviewFields {
  Author = 'author',
  Text = 'text',
  Rating = 'rating',
}

export const AUTHOR_MAX_VALUE = 100;
export const TEXT_MAX_VALUE = 2000;
export const TEXT_INPUT_REG_EXP = /^[Ёёа-яА-Яa-zA-Z0-9 –“«».,/\-()№"']*$/;

export const DEFAULT_ADDREVIEW_FORM_VALUES = {
  [AddReviewFields.Author]: '',
  [AddReviewFields.Text]: '',
  [AddReviewFields.Rating]: '',
};

export const HeroBackground = {
  '3ebc7206-6fed-4ea7-a000-27a74e867c9a':
    "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center / cover no-repeat",
  '565ad1cb-b891-4185-ac75-24ab3898cf22':
    "url('https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center / cover no-repeat",
};
