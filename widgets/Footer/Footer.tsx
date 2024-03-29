import { COMMON_TITLE } from '@/shared';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 w-full">
      <div className="container px-6 py-12 mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Помогаем людям выбрать лучшие места</h2>

          <p className="max-w-md mx-auto mt-2 text-gray-500 dark:text-gray-400">На основе анализа реальных отзывов</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Сервис</h3>

            <div className="flex flex-col items-start mt-4 space-y-4">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Главная
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Каталог
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Тарифы
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Помощь
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Компания</h3>

            <div className="flex flex-col items-start mt-4 space-y-4">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                О Нас
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Вакансии
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Статьи
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Новости
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Контакты
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ресурсы</h3>

            <div className="flex flex-col items-start mt-4 space-y-4">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Блог
              </a>

              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                События
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Помощь
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Кейсы</h3>

            <div className="flex flex-col items-start mt-4 space-y-4">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Малый бизнес
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Средний бизнес
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Отчетность
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Аналитика
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Social</h3>

            <div className="flex flex-col items-start mt-4 space-y-4">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                VK
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Юр. информация</h3>

            <div className="flex flex-col items-start mt-4 space-y-4">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Публичная оферта
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Политика безопастности
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Cookies
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Лицензии
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Пользовательское соглашение
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Реквизиты
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div className="flex flex-col items-center justify-between sm:flex-row">
          <a href="#">{COMMON_TITLE.toUpperCase()}</a>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">{`© Все права защищены 2023-${new Date().getFullYear()}`}</p>
        </div>
      </div>
    </footer>
  );
};
