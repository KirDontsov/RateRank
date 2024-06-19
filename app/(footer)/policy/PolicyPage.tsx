'use client';
import { Curve } from '@/features';
import { COMMON_TITLE, CommonNavProps } from '@/shared';
import { CommonHeader, Footer, Nav, Section } from '@/widgets';
import { FC } from 'react';

export const PolicyPage: FC<CommonNavProps> = ({ cities, categories }) => {
  return (
    <div>
      <Curve>
        <Nav cities={cities} categories={categories} />
        <Section>
          <CommonHeader title={`Политика  ${COMMON_TITLE} в отношении обработки персональных данных`} />
          <div className="w-full flex flex-col items-center gap-4">
            <div className="container h-fit w-full flex flex-col gap-4 px-8 py-10 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-800">
              <p>
                Настоящая Политика Топвыбор.рф в отношении обработки персональных данных (далее – Политика) разработана
                в соответствии с Конституцией Российской Федерации, Гражданским Кодексом Российской Федерации,
                Федеральным законом от 27.07.2006 г. №152-ФЗ «О персональных данных» (далее – Закон), Федеральным
                законом от 27.07.2006 г. №149-ФЗ «Об информации, информационных технологиях и защите информации» и
                другими нормативно-правовыми актами Российской Федерации. Настоящая Политика определяет порядок
                обработки и гарантии обеспечения защиты прав субъектов персональных данных в Обществе с ограниченной
                ответственностью «Топ выбор» (далее – Топ выбор и (или) Оператор) с целью защиты прав и свобод человека
                и гражданина при обработке его персональных данных.
              </p>

              <h2 className="text-lg dark:text-blue-400 text-blue-400">ОПРЕДЕЛЕНИЕ ТЕРМИНОВ</h2>
              <p>Основные понятия, используемые в настоящей Политике:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  Персональные данные - любая информация, относящаяся к прямо или косвенно определенному или
                  определяемому физическому лицу (Субъекту персональных данных);
                </li>
                <li>
                  Оператор - государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно
                  или совместно с другими лицами организующие и (или) осуществляющие обработку персональных данных, а
                  также определяющие цели обработки персональных данных, состав персональных данных, подлежащих
                  обработке, действия (операции), совершаемые с персональными данными;
                </li>
                <li>
                  Обработка персональных данных - любое действие (операция) или совокупность действий (операций),
                  совершаемых с использованием средств автоматизации или без использования таких средств с персональными
                  данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление,
                  изменение), извлечение, использование, передачу (распространение, предоставление, доступ),
                  обезличивание, блокирование, удаление, уничтожение персональных данных;
                </li>
                <li>
                  Автоматизированная обработка персональных данных - обработка персональных данных с помощью средств
                  вычислительной техники;
                </li>
                <li>
                  Предоставление персональных данных - действия, направленные на раскрытие персональных данных
                  определенному лицу или определенному кругу лиц;
                </li>
                <li>
                  Блокирование персональных данных - временное прекращение обработки персональных данных (за исключением
                  случаев, если обработка необходима для уточнения персональных данных);
                </li>
                <li>
                  Уничтожение персональных данных - действия, в результате которых становится невозможным восстановить
                  содержание персональных данных в информационной системе персональных данных и (или) в результате
                  которых уничтожаются материальные носители персональных данных;
                </li>
                <li>
                  Информационная система персональных данных - совокупность содержащихся в базах данных персональных
                  данных и обеспечивающих их обработку информационных технологий и технических средств;
                </li>
                <li>
                  Трансграничная передача персональных данных – передача персональных данных на территорию иностранного
                  государства органу власти иностранного государства, иностранному физическому лицу или иностранному
                  юридическому лицу;
                </li>
                <li>
                  Онлайн-ресурс Топ выбор (далее также — «Топ выбор») — ресурс в сети Интернет, представляющий собой
                  совокупность программы для ЭВМ и базы данных, которые размещены на серверах Лицензиара и (или) его
                  подрядчиков, исполняют программный код Лицензиара и обеспечивают доступность данных Лицензиата,
                  содержащихся в базе данных, в целях привлечения клиентов и управления репутацией в сети Интернет.
                  Онлайн-ресурс Топ выбор размещён в сети Интернет в открытом доступе на доменах Топвыбор.рф, включая
                  все домены третьего и более низких уровней, как функционирующие на дату заключения настоящего
                  Договора, так и вводимые в эксплуатацию в течение всего срока действия Договора;
                </li>
                <li>
                  Пользователь Топ выбор - физическое лицо, не являющееся Лицензиатом и(или) его представителем или
                  плательщиком, которое посредством доступа к Топ выбор осуществляет поиск организаций, оказывающих
                  профессиональные услуги.
                </li>
              </ul>
              <h2 className="text-lg dark:text-blue-400 text-blue-400">
                ПРАВОВОЕ ОСНОВАНИЕ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ
              </h2>
              <p>
                Правовым основанием обработки персональных данных является совокупность нормативных правовых актов, в
                соответствии с которыми Оператор осуществляет обработку персональных данных, в том числе:
              </p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Конституция Российской Федерации;</li>
                <li>Трудовой кодекс Российской Федерации;</li>
                <li>Гражданский Кодекс Российской Федерации;</li>
                <li>Налоговый кодекс Российской Федерации;</li>
                <li>Федеральный закон от 6 декабря 2011 г. № 402-ФЗ “О бухгалтерском учёте”;</li>
                <li>Федеральный закон от 27 июля 2006 г. № 152-ФЗ “О персональных данных”;</li>
              </ul>
              <p>Условием обработки персональных данных также являются:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Устав Оператора;</li>
                <li>
                  договоры, заключаемые с Субъектом персональных данных или по его инициативе, в том числе договоры по
                  которым Субъект персональных данных будет являться выгодоприобретателем или поручителем;
                </li>
                <li>согласие Субъекта персональных данных на обработку персональных данных.</li>
              </ul>

              <h2 className="text-lg dark:text-blue-400 text-blue-400">ЦЕЛИ, ОБЪЕМ И КАТЕГОРИИ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
              <p>
                Категории Субъектов персональных данных и категории обрабатываемых персональных данных, а также цели их
                обработки указаны в Приложениях к настоящей Политике в отношении обработки персональных данных.
              </p>
              <p>
                Независимо от существующей судебной практики и разъяснений уполномоченных органов, Оператор относит к
                персональным данным, в том числе данные, позволяющие идентифицировать субъекта или его оконечное
                оборудование (cookie-файлы, web-маячки, пиксельные метки, IP-адреса, информация о браузере или иной
                программе, с помощью которой осуществляет доступ к Топ выбор) и другие технологии цифрового
                маркирования. Топ выбор также может содержать ссылки (представленные в форме гиперссылок, виджетов,
                логотипов, изображений или заголовков, активизируемых щелчком мыши) на веб-сайты третьих лиц или
                веб-сайты, указанные третьими лицами. Переходя по ссылке на любой из таких вебсайтов, следует помнить,
                что каждый из них имеет собственную политику конфиденциальности и мы не несем никакой ответственности за
                политику конфиденциальности третьих лиц. Настоятельно рекомендуем изучить политику конфиденциальности
                таких веб-сайтов и условия их использования с целью ознакомления с правилами сбора, использования и
                обмена информацией. Мы не несем ответственности в отношении политики конфиденциальности, равно как в
                отношении содержимого веб-сайтов третьих лиц.
              </p>
              <p>
                Обработка персональных данных может осуществляться Оператором исключительно в целях исполнения прав и
                обязанностей по договорам и соглашениям, заключаемым с субъектами персональных данных, обеспечения
                соблюдения законов и иных нормативно правовых актов, а также с целью соблюдения других законных
                интересов Оператора или субъектов персональных данных.
              </p>
              <p>
                Персональные данные собираются и используются в той мере, в которой это оправдано целью обработки таких
                персональных данных. Оператор изыскивает способы и методы для использования исключительно обезличенных
                персональных данных в той мере и в той степени, насколько это оправдано целями обработки персональных
                данных.
              </p>

              <h2 className="text-lg dark:text-blue-400 text-blue-400">ПРИНЦИПЫ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
              <p>Обработка персональных данных у Оператора осуществляется на основании следующих принципов:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>законности и справедливой основы;</li>
                <li>
                  ограничения обработки персональных данных достижением конкретных, заранее определенных и законных
                  целей;
                </li>
                <li>
                  недопущения объединения баз данных, содержащих персональные данные, обработка которых осуществляется в
                  целях, несовместимых между собой;
                </li>
                <li>обработки только тех персональных данных, которые отвечают целям их обработки;</li>
                <li>соответствия содержания и объема обрабатываемых персональных данных заявленным целям обработки;</li>
                <li>
                  недопущения обработки персональных данных, избыточных по отношению к заявленным целям их обработки;
                </li>
                <li>
                  обеспечения точности, достаточности и актуальности персональных данных по отношению к целям обработки
                  персональных данных;
                </li>
                <li>
                  уничтожения либо обезличивания персональных данных по достижении целей их обработки или в случае
                  утраты необходимости в достижении этих целей, при невозможности устранения Оператором допущенных
                  нарушений персональных данных, если иное не предусмотрено федеральным законом.
                </li>
              </ul>

              <h2 className="text-lg dark:text-blue-400 text-blue-400">СРОКИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
              <p>
                Обработка и хранение персональных данных осуществляются не дольше, чем этого требуют цели обработки
                персональных данных, если отсутствуют законные основания для дальнейшей обработки, например, если
                законодательными актами или соглашением с субъектом персональных данных не установлен соответствующий
                срок хранения.
              </p>
              <p>
                Обработка персональных данных подлежит прекращению путем уничтожения при наступлении следующий условий:
              </p>

              <ul className="space-y-1 list-disc list-inside">
                <li>достижение целей обработки персональных данных или максимальных сроков хранения;</li>
                <li>утрата необходимости в достижении целей обработки персональных данных;</li>
                <li>
                  предоставление субъектом персональных данных или его законным представителем подтверждения того, что
                  персональные данные являются незаконно полученными или не являются необходимыми для заявленной цели
                  обработки;
                </li>
                <li>невозможность обеспечения правомерности обработки персональных данных;</li>
                <li>
                  отзыв субъектом персональных данных согласия на обработку персональных данных, если сохранение
                  персональных данных более не требуется для целей обработки персональных данных.
                </li>
              </ul>

              <h2 className="text-lg dark:text-blue-400 text-blue-400">КОНФИДЕНЦИАЛЬНОСТЬ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
              <p>
                Оператор и иные лица, получившие доступ к персональным данным, обязаны не раскрывать третьим лицам и не
                распространять персональные данные без согласия субъекта персональных данных, если иное не предусмотрено
                федеральным законом.
              </p>
              <p>
                Оператор вправе передавать персональные данные органам дознания и следствия, иным уполномоченным органам
                по основаниям, предусмотренным действующим законодательством Российской Федерации.
              </p>

              <h2 className="text-lg dark:text-blue-400 text-blue-400">ОБЩЕДОСТУПНЫЕ ИСТОЧНИКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
              <p>
                В целях информационного обеспечения могут создаваться общедоступные источники персональных данных (в том
                числе справочники, адресные книги). В общедоступные источники персональных данных с письменного согласия
                субъекта персональных данных могут включаться его фамилия, имя, отчество, год и место рождения, адрес,
                абонентский номер, сведения о профессии и иные персональные данные, сообщаемые субъектом персональных
                данных.
              </p>
              <p>
                Сведения о субъекте персональных данных должны быть в любое время исключены из общедоступных источников
                персональных данных по требованию субъекта персональных данных либо по решению суда или иных
                уполномоченных государственных органов.
              </p>
              <p>
                Специальные категории персональных данных, а также, биометрические персональные данные Оператором не
                обрабатываются.
              </p>

              <h2 className="text-lg dark:text-blue-400 text-blue-400">
                ПОРУЧЕНИЕ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ ТРЕТЬЕМУ (ДРУГОМУ) ЛИЦУ
              </h2>
              <p>
                Оператор вправе поручить обработку персональных данных другому лицу, в том числе находящемуся за
                пределами Российской Федерации (трансграничная передача персональных данных), с согласия субъекта
                персональных данных, если иное не предусмотрено федеральным законом, на основании заключаемого с этим
                лицом договора. Лицо, осуществляющее обработку персональных данных по поручению Оператора, обязано
                соблюдать принципы и правила обработки персональных данных, предусмотренные Законом. Трансграничная
                передача персональных данных осуществляется с целью исполнения прав и обязанностей по договорам или
                соглашениям, заключаемым с субъектами персональных данных, а также для обеспечения соблюдения законов и
                иных нормативно-правовых актов.
              </p>
              <p>
                Лицо, осуществляющее обработку персональных данных по поручению Оператора, не обязано получать согласие
                субъекта персональных данных на обработку его персональных данных.
              </p>
              <p>
                В случае, если Оператор поручает обработку персональных данных другому лицу, ответственность перед
                субъектом персональных данных за действия указанного лица несет Оператор. Лицо, осуществляющее обработку
                персональных данных по поручению Оператора, несет ответственность перед Оператором.
              </p>

              <h2 className="text-lg dark:text-blue-400 text-blue-400">
                СОГЛАСИЕ СУБЪЕКТА ПЕРСОНАЛЬНЫХ ДАННЫХ НА ОБРАБОТКУ ЕГО ПЕРСОНАЛЬНЫХ ДАННЫХ
              </h2>
              <p>
                Субъект персональных данных принимает решение о предоставлении его персональных данных и дает согласие
                на их обработку свободно, своей волей и в своем интересе. Согласие на обработку персональных данных
                должно быть конкретным, информированным и сознательным. Согласие на обработку персональных данных может
                быть дано субъектом персональных данных или его представителем в любой позволяющей подтвердить факт его
                получения форме, если иное не установлено федеральным законом.
              </p>
              <p>
                Согласие на обработку персональных данных может быть отозвано субъектом персональных данных. В случае
                отзыва субъектом персональных данных согласия на обработку персональных данных Оператор вправе
                продолжить обработку персональных данных без согласия субъекта персональных данных при наличии
                оснований, указанных в пунктах пунктах 2 - 11 части 1 статьи 6, части 2 статьи 10 и части 2 статьи 11
                Федерального закона «О персональных данных».
              </p>
              <p>
                Обязанность предоставить доказательство получения согласия субъекта персональных данных на обработку его
                персональных данных возлагается на Оператора.
              </p>

              <h2 className="text-lg dark:text-blue-400 text-blue-400">ПРАВА СУБЪЕКТА ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
              <p>
                Субъект персональных данных имеет право отозвать согласие на обработку персональных данных, направив
                соответствующий запрос Оператору.
              </p>
              <p>
                Субъект персональных данных имеет право на получение у Оператора информации, касающейся обработки его
                персональных данных, если такое право не ограничено в соответствии с федеральными законами.
              </p>
              <p>
                Субъект персональных данных вправе требовать от Оператора уточнения его персональных данных, их
                блокирования или уничтожения в случае, если персональные данные являются неполными, устаревшими,
                неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки, а также
                принимать предусмотренные законом меры по защите своих прав.
              </p>
              <p>
                Если субъект персональных данных считает, что Оператор осуществляет обработку его персональных данных с
                нарушением требований Закона или иным образом нарушает его права и свободы, субъект персональных данных
                вправе обжаловать действия или бездействие Оператора путем направления соответствующего уведомления
                Оператору в письменной форме, а также обращения в уполномоченный орган по защите прав субъектов
                персональных данных.
              </p>

              <h2 className="text-lg dark:text-blue-400 text-blue-400">
                АКТУАЛИЗАЦИЯ, ИСПРАВЛЕНИЕ, УДАЛЕНИЕ ПЕРСОНАЛЬНЫХ ДАННЫХ, ОТВЕТЫ НА ЗАПРОСЫ СУБЪЕКТОВ НА ДОСТУП К
                ПЕРСОНАЛЬНЫМ ДАННЫМ
              </h2>
              <p>
                Подтверждение факта обработки персональных данных Оператором, правовые основания и цели обработки
                персональных данных, а также иные сведения, предоставляются Оператором Субъекту персональных данных или
                его представителю при обращении либо при получении запроса Субъекта персональных данных или его
                представителя в течение десяти рабочих дней с момента поступления обращения или получения запроса. В
                предоставляемые сведения не включаются персональные данные, относящиеся к другим Субъектам персональных
                данных, за исключением случаев, когда имеются законные основания для раскрытия таких персональных
                данных.
              </p>
              <p>Запрос должен содержать:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  номер основного документа, удостоверяющего личность Субъекта персональных данных или его
                  представителя, сведения о дате выдачи указанного документа и выдавшем его органе;
                </li>
                <li>
                  ведения, подтверждающие участие Субъекта персональных данных в отношениях с Оператором (номер
                  договора, дата заключения договора, условное словесное обозначение и (или) иные сведения), либо
                  сведения, иным образом подтверждающие факт обработки персональных данных Оператором;
                </li>
                <li>дату составления запроса и подпись Субъекта персональных данных или его представителя.</li>
              </ul>
              <p>
                Запрос может быть направлен в форме электронного документа, подписанного электронной подписью в
                соответствии с законодательством Российской Федерации или почтовым отправлением на юридический адрес
                Оператора.
              </p>
              <p>
                Если в обращении (запросе) Субъекта персональных данных не отражены в соответствии с требованиями Закона
                о персональных данных все необходимые сведения или субъект не обладает правами доступа к запрашиваемой
                информации, то ему направляется мотивированный отказ.
              </p>
              <p>
                Право Субъекта персональных данных на доступ к его персональным данным может быть ограничено в
                соответствии с частью 8 статьи 14 Федерального закона от 27.07.2006 N 152-ФЗ «О персональных данных», в
                том числе если доступ Субъекта персональных данных к его персональным данным нарушает права и законные
                интересы третьих лиц.
              </p>
              <p>
                В случае выявления неправомерной обработки персональных данных при обращении (запросе) Субъекта
                персональных данных или его представителя либо Роскомнадзора Оператор осуществляет блокирование
                неправомерно обрабатываемых персональных данных, относящихся к этому Субъекту персональных данных, с
                момента такого обращения или получения запроса.
              </p>
              <p>
                При достижении целей обработки персональных данных, а также в случае отзыва Субъектом персональных
                данных согласия на их обработку персональные данные подлежат уничтожению, если:
              </p>
              <ul className="space-y-1 list-disc list-inside">
                <li>иное не предусмотрено договором, стороной которого является Субъект персональных данных;</li>
                <li>
                  оператор не вправе осуществлять обработку без согласия Субъекта персональных данных на основаниях,
                  предусмотренных Законом о персональных данных или иными федеральными законами;
                </li>
                <li>иное не предусмотрено другим соглашением между Оператором и Субъектом персональных данных.</li>
              </ul>

              <h2 className="text-lg dark:text-blue-400 text-blue-400">ОБЕСПЕЧЕНИЕ БЕЗОПАСНОСТИ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
              <p>
                Безопасность персональных данных, обрабатываемых оператором, обеспечивается реализацией правовых,
                организационных и технических мер, необходимых для обеспечения требований федерального законодательства
                в области защиты персональных данных.
              </p>
              <p>
                Для предотвращения несанкционированного доступа к персональным данным, Оператором применяются следующие
                организационно-технические и правовые меры:
              </p>
              <ul className="space-y-1 list-disc list-inside">
                <li>ограничение состава лиц, имеющих доступ к персональным данным;</li>
                <li>
                  ознакомление субъектов персональных данных с требованиями федерального законодательства и с настоящей
                  Политикой Оператора по обработке и защите персональных данных;
                </li>
                <li>организация учета, хранения и обращения носителей информации;</li>
                <li>
                  разграничение доступа пользователей к информационным ресурсам и программно-аппаратным средствам
                  обработки информации;
                </li>
                <li>регистрация и учет действий пользователей информационных систем персональных данных;</li>
                <li>
                  применение в необходимых случаях средств межсетевого экранирования, обнаружения вторжений, анализа
                  защищенности и средств криптографической защиты информации
                </li>
              </ul>
              <h2 className="text-lg dark:text-blue-400 text-blue-400">ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h2>
              <p>
                Иные права и обязанности Оператора, как оператора персональных данных определяются законодательством
                Российской Федерации в области персональных данных.
              </p>
              <p>
                Должностные лица Оператора, виновные в нарушении норм, регулирующих обработку и защиту персональных
                данных, несут материальную, дисциплинарную, административную, гражданско-правовую или уголовную
                ответственность в порядке, установленном федеральными законами.
              </p>
              <p>
                Настоящая Политика может изменяться Оператором с учетом изменяющихся требований законодательства, а
                также развития организационно-технических мер защиты персональных данных. Изменение текста настоящей
                Политики осуществляется путем замены действующей редакции, размещенной в
                информационно-телекоммуникационной сети Интернет, новой редакцией или публикацией изменений к такой
                Политике.
              </p>
            </div>
          </div>
          <div className="flex w-full">
            <Footer />
          </div>
        </Section>
      </Curve>
    </div>
  );
};
