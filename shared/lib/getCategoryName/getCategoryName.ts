export interface GetCategoryNameProps {
  name?: string;
  single?: boolean;
  rod?: boolean;
  dat?: boolean;
  tv?: boolean;
}

export function getCategoryName({
  name = '',
  single = false,
  rod = false,
  tv = false,
  dat = false,
}: GetCategoryNameProps) {
  if (!single && !rod && !tv && !dat) {
    return name;
  }

  if (single) {
    if (name === 'Школы') {
      return name.slice(0, -1).concat('а');
    }
    return name.slice(0, -1);
  }

  if (rod) {
    if (name === 'Школы') {
      return name;
    }
    return name.slice(0, -1).concat('а');
  }

  if (tv) {
    return name.slice(0, -1).concat('е');
  }

  if (dat) {
    if (name === 'Школы') {
      return name.slice(0, -1).concat('у');
    }
    return name.slice(0, -1);
  }

  return name.slice(0, -1);
}
