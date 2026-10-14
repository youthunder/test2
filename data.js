/**
 * 중학교 영어 문장의 어순 학습 데이터
 * 주제: 나라별 전통 음식 (Spice Market & Food Passport)
 * 카테고리: 찬성(pro), 중립(neutral), 반대(con) 각 5문장
 */

export const SENTENCE_DATA = {
  pro: {
    categoryName: "찬성 입장",
    categoryEnglish: "In Favor / Pro",
    themeColor: "var(--color-basil)",
    icon: "👍",
    description: "전통 음식의 건강 가치, 문화 보존, 가족 유대에 찬성하는 의견들입니다.",
    questions: [
      {
        id: "pro_1",
        country: "대한민국 🇰🇷",
        countryCode: "KOR",
        dish: "전통 김치 (Kimchi)",
        stampTitle: "KOREA TRADITIONAL FOOD VISA",
        stampDate: "SEOUL • IMMIGRATION",
        korean: "많은 의사들은 김치를 먹는 것이 우리의 면역 체계를 강화한다고 믿는다.",
        fullEnglish: "Many doctors believe that eating kimchi strengthens our immune system.",
        formula: "주어 + 동사 + that + [동명사 주어 + 동사 + 목적어]",
        formulaDetail: "주절: Many doctors(주어) + believe(동사) | 종속절(that절): eating kimchi(주어) + strengthens(동사) + our immune system(목적어)",
        chunks: [
          { id: "p1_1", text: "Many doctors believe", isSubjectVerb: true, roleLabel: "주어+동사", hint: "누가 무엇을 믿을까요? (주절 주어+동사)" },
          { id: "p1_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "목적어절을 이끄는 접속사 that" },
          { id: "p1_3", text: "eating kimchi", isSubjectVerb: false, roleLabel: "that절 주어", hint: "김치를 먹는 것은 (동명사 주어)" },
          { id: "p1_4", text: "strengthens", isSubjectVerb: false, roleLabel: "that절 동사", hint: "강화한다 (단수 취급 동사)" },
          { id: "p1_5", text: "our immune system.", isSubjectVerb: false, roleLabel: "that절 목적어", hint: "무엇을? 우리의 면역 체계를" }
        ],
        explanation: "주어(Many doctors) + 동사(believe) 뒤에 명사절 접속사 that이 오고, that절 안에서 동명사(eating kimchi)가 주어 역할을 하므로 단수동사 strengthens가 이어집니다."
      },
      {
        id: "pro_2",
        country: "이탈리아 🇮🇹",
        countryCode: "ITA",
        dish: "화덕 나폴리 피자 (Neapolitan Pizza)",
        stampTitle: "ITALY SLOW FOOD PASSPORT",
        stampDate: "NAPOLI • IMMIGRATION",
        korean: "나는 전통 이탈리아 피자가 패스트푸드보다 더 건강한 재료를 제공한다는 것에 강하게 동의한다.",
        fullEnglish: "I strongly agree that traditional Italian pizza offers healthier ingredients than fast food.",
        formula: "주어 + 부사 + 동사 + that + [주어 + 동사 + 목적어 + 비교구]",
        formulaDetail: "주절: I(주어) + strongly(부사) + agree(동사) | that절: traditional Italian pizza(주어) + offers(동사) + healthier ingredients(목적어) + than fast food(비교)",
        chunks: [
          { id: "p2_1", text: "I strongly agree", isSubjectVerb: true, roleLabel: "주어+부사+동사", hint: "나는 강력히 동의한다 (주절 주어+동사)" },
          { id: "p2_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "의견 내용을 연결하는 that" },
          { id: "p2_3", text: "traditional Italian pizza", isSubjectVerb: false, roleLabel: "that절 주어", hint: "어떤 음식이? 전통 이탈리아 피자가" },
          { id: "p2_4", text: "offers", isSubjectVerb: false, roleLabel: "that절 동사", hint: "제공한다 (3인칭 단수 현재동사)" },
          { id: "p2_5", text: "healthier ingredients", isSubjectVerb: false, roleLabel: "that절 목적어", hint: "더 건강한 재료들을" },
          { id: "p2_6", text: "than fast food.", isSubjectVerb: false, roleLabel: "비교구", hint: "무엇보다? 패스트푸드보다" }
        ],
        explanation: "동사를 꾸며주는 부사(strongly)가 동사 앞이나 뒤에 붙을 수 있으며, that절 안에는 [주어 + 동사 + 목적어 + 비교표현(than...)]의 순서로 자연스럽게 배치됩니다."
      },
      {
        id: "pro_3",
        country: "멕시코 🇲🇽",
        countryCode: "MEX",
        dish: "전통 길거리 타코 (Traditional Tacos)",
        stampTitle: "MEXICO CULINARY VISA",
        stampDate: "OAXACA • ENTRY PERMIT",
        korean: "우리는 전통 타코를 함께 나누어 먹는 것이 식탁에서 가족들을 하나로 모은다고 생각한다.",
        fullEnglish: "We think that sharing traditional tacos brings families together at the table.",
        formula: "주어 + 동사 + that + [동명사 주어 + 동사 + 목적어 + 부사구]",
        formulaDetail: "주절: We(주어) + think(동사) | that절: sharing traditional tacos(주어) + brings(동사) + families(목적어) + together(부사) + at the table(장소부사구)",
        chunks: [
          { id: "p3_1", text: "We think", isSubjectVerb: true, roleLabel: "주어+동사", hint: "우리는 생각한다 (주절 주어+동사)" },
          { id: "p3_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "생각하는 내용을 잇는 that" },
          { id: "p3_3", text: "sharing traditional tacos", isSubjectVerb: false, roleLabel: "that절 주어", hint: "전통 타코를 나누는 것이" },
          { id: "p3_4", text: "brings families together", isSubjectVerb: false, roleLabel: "that절 동사+목적어+부사", hint: "가족들을 하나로 모은다" },
          { id: "p3_5", text: "at the table.", isSubjectVerb: false, roleLabel: "장소 부사구", hint: "어디에서? 식탁에서" }
        ],
        explanation: "동명사구(sharing traditional tacos)는 하나의 행위이므로 3인칭 단수 취급하여 brings가 쓰이고, bring A together(A를 한데 모으다) 표현 뒤에 장소 부사구(at the table)가 옵니다."
      },
      {
        id: "pro_4",
        country: "태국 🇹🇭",
        countryCode: "THA",
        dish: "팟타이와 야시장 음식 (Pad Thai & Street Food)",
        stampTitle: "THAILAND SPICE EMBASSY",
        stampDate: "BANGKOK • VERIFIED",
        korean: "현지 사람들은 길거리 음식 문화를 보존하는 것이 국가적 문화유산을 지킨다고 주장한다.",
        fullEnglish: "Local people insist that preserving street food culture protects their national heritage.",
        formula: "주어 + 동사 + that + [동명사 주어 + 동사 + 목적어]",
        formulaDetail: "주절: Local people(주어) + insist(동사) | that절: preserving street food culture(주어) + protects(동사) + their national heritage(목적어)",
        chunks: [
          { id: "p4_1", text: "Local people insist", isSubjectVerb: true, roleLabel: "주어+동사", hint: "현지 주민들은 주장한다 (주절 주어+동사)" },
          { id: "p4_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "주장하는 내용을 잇는 접속사 that" },
          { id: "p4_3", text: "preserving street food culture", isSubjectVerb: false, roleLabel: "that절 주어", hint: "길거리 음식 문화를 보존하는 것이" },
          { id: "p4_4", text: "protects", isSubjectVerb: false, roleLabel: "that절 동사", hint: "지킨다 / 보호한다" },
          { id: "p4_5", text: "their national heritage.", isSubjectVerb: false, roleLabel: "that절 목적어", hint: "그들의 국가적 문화유산을" }
        ],
        explanation: "insist(주장하다) 뒤에 that절이 이어지며, preserving(~을 보존하는 것) 동명사 주어에 맞추어 단수 동사 protects가 목적어 their national heritage와 결합합니다."
      },
      {
        id: "pro_5",
        country: "프랑스 🇫🇷",
        countryCode: "FRA",
        dish: "프랑스식 코스 요리 (French Gastronomy)",
        stampTitle: "FRANCE CULINARY HERITAGE",
        stampDate: "PARIS • CHEF APPROVED",
        korean: "대부분의 프랑스 요리사들은 저녁 식사에 충분한 시간을 들이는 것이 우리의 건강을 향상시킨다고 주장한다.",
        fullEnglish: "Most French chefs argue that taking enough time for dinner improves our health.",
        formula: "주어 + 동사 + that + [동명사 주어구 + 동사 + 목적어]",
        formulaDetail: "주절: Most French chefs(주어) + argue(동사) | that절: taking enough time for dinner(주어) + improves(동사) + our health(목적어)",
        chunks: [
          { id: "p5_1", text: "Most French chefs argue", isSubjectVerb: true, roleLabel: "주어+동사", hint: "대부분의 프랑스 요리사들은 주장한다 (주어+복수동사)" },
          { id: "p5_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "주장 내용 that" },
          { id: "p5_3", text: "taking enough time for dinner", isSubjectVerb: false, roleLabel: "that절 주어구", hint: "저녁에 충분한 시간을 들이는 것이" },
          { id: "p5_4", text: "improves", isSubjectVerb: false, roleLabel: "that절 동사", hint: "개선한다 / 향상시킨다" },
          { id: "p5_5", text: "our health.", isSubjectVerb: false, roleLabel: "that절 목적어", hint: "우리의 건강을" }
        ],
        explanation: "영어에서는 주절(Most French chefs argue) 뒤에 that으로 긴 명사절을 엮고, 그 안에서 주어구(taking enough time...)와 동사(improves), 목적어(our health)가 차례대로 나옵니다."
      }
    ]
  },
  neutral: {
    categoryName: "중립 입장",
    categoryEnglish: "Neutral / Balanced",
    themeColor: "var(--color-turmeric)",
    icon: "⚖️",
    description: "장단점을 균형 있게 비교하고 양면성을 설명하는 객관적인 문장들입니다.",
    questions: [
      {
        id: "neu_1",
        country: "인도 🇮🇳",
        countryCode: "IND",
        dish: "향신료 마살라 카레 (Spicy Masala Curry)",
        stampTitle: "INDIA SPICE ROUTE ENTRY",
        stampDate: "DELHI • CUSTOMS CLEAR",
        korean: "일부 연구자들은 매운 인도 카레가 건강상의 이점과 소화 위험을 둘 다 지닌다고 말한다.",
        fullEnglish: "Some researchers state that spicy Indian curry has both health benefits and digestive risks.",
        formula: "주어 + 동사 + that + [주어 + 동사 + 목적어(both A and B)]",
        formulaDetail: "주절: Some researchers(주어) + state(동사) | that절: spicy Indian curry(주어) + has(동사) + both health benefits and digestive risks(목적어)",
        chunks: [
          { id: "n1_1", text: "Some researchers state", isSubjectVerb: true, roleLabel: "주어+동사", hint: "일부 연구자들은 진술한다/말한다 (주어+동사)" },
          { id: "n1_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "진술 내용을 이끄는 that" },
          { id: "n1_3", text: "spicy Indian curry", isSubjectVerb: false, roleLabel: "that절 주어", hint: "매운 인도 카레가" },
          { id: "n1_4", text: "has", isSubjectVerb: false, roleLabel: "that절 동사", hint: "가지고 있다 (단수동사)" },
          { id: "n1_5", text: "both health benefits", isSubjectVerb: false, roleLabel: "목적어 A", hint: "건강상의 이점들과" },
          { id: "n1_6", text: "and digestive risks.", isSubjectVerb: false, roleLabel: "목적어 B", hint: "그리고 소화기 위험성 둘 다를" }
        ],
        explanation: "'both A and B'는 'A와 B 둘 다'라는 뜻으로, 타동사 has의 목적어 자리에 대등하게 묶여서 들어갑니다."
      },
      {
        id: "neu_2",
        country: "일본 🇯🇵",
        countryCode: "JPN",
        dish: "발효 낫토 (Fermented Natto)",
        stampTitle: "JAPAN TRADITION VISA",
        stampDate: "TOKYO • IMMIGRATION",
        korean: "영양 전문가들은 발효된 낫토가 톡 쏘는 냄새가 나지만 풍부한 비타민을 함유하고 있다고 언급한다.",
        fullEnglish: "Nutrition experts mention that fermented natto smells pungent but contains rich vitamins.",
        formula: "주어 + 동사 + that + [주어 + 동사1 + 보어 + but + 동사2 + 목적어]",
        formulaDetail: "주절: Nutrition experts(주어) + mention(동사) | that절: fermented natto(주어) + smells(감각동사) + pungent(형용사보어) + but(접속사) + contains(동사) + rich vitamins(목적어)",
        chunks: [
          { id: "n2_1", text: "Nutrition experts mention", isSubjectVerb: true, roleLabel: "주어+동사", hint: "영양 전문가들은 언급한다 (주어+복수동사)" },
          { id: "n2_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "언급 내용 연결 that" },
          { id: "n2_3", text: "fermented natto", isSubjectVerb: false, roleLabel: "that절 주어", hint: "발효된 낫토는" },
          { id: "n2_4", text: "smells pungent", isSubjectVerb: false, roleLabel: "감각동사+보어", hint: "자극적인(톡 쏘는) 냄새가 난다" },
          { id: "n2_5", text: "but contains", isSubjectVerb: false, roleLabel: "접속사+동사2", hint: "그러나 포함하고 있다" },
          { id: "n2_6", text: "rich vitamins.", isSubjectVerb: false, roleLabel: "동사2 목적어", hint: "풍부한 비타민들을" }
        ],
        explanation: "smell은 2형식 감각동사로 뒤에 형용사 보어(pungent)를 취하며, 접속사 but으로 두 번째 동사 contains와 그 목적어가 병렬 연결됩니다."
      },
      {
        id: "neu_3",
        country: "스페인 🇪🇸",
        countryCode: "ESP",
        dish: "스페인 타파스 (Spanish Tapas)",
        stampTitle: "SPAIN TAPAS EMBASSY",
        stampDate: "BARCELONA • TRANSIT",
        korean: "많은 여행자들은 스페인 타파스가 편리할 수 있지만 푸짐한 식사로는 비용이 많이 들 수 있다고 느낀다.",
        fullEnglish: "Many travelers feel that Spanish tapas can be convenient yet costly for big meals.",
        formula: "주어 + 동사 + that + [주어 + 조동사+동사원형 + 형용사보어1 + yet + 형용사보어2 + 부사구]",
        formulaDetail: "주절: Many travelers(주어) + feel(동사) | that절: Spanish tapas(주어) + can be(조동사+be) + convenient(보어1) + yet(접속사) + costly(보어2) + for big meals(부사구)",
        chunks: [
          { id: "n3_1", text: "Many travelers feel", isSubjectVerb: true, roleLabel: "주어+동사", hint: "많은 여행자들은 느낀다 (주어+동사)" },
          { id: "n3_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "느끼는 내용을 잇는 that" },
          { id: "n3_3", text: "Spanish tapas", isSubjectVerb: false, roleLabel: "that절 주어", hint: "스페인의 타파스가" },
          { id: "n3_4", text: "can be convenient", isSubjectVerb: false, roleLabel: "조동사+be+보어", hint: "편리할 수는 있다" },
          { id: "n3_5", text: "yet costly", isSubjectVerb: false, roleLabel: "접속사+보어2", hint: "하지만 비용이 많이 든다" },
          { id: "n3_6", text: "for big meals.", isSubjectVerb: false, roleLabel: "전치사구", hint: "큰 식사(배부른 식사)로는" }
        ],
        explanation: "can be 뒤에 두 개의 형용사 보어 convenient(편리한)와 costly(비용이 많이 드는)가 'yet(그러나)'으로 이어져 중립적인 장단점을 표현합니다."
      },
      {
        id: "neu_4",
        country: "베트남 🇻🇳",
        countryCode: "VNM",
        dish: "전통 쌀국수 퍼 (Vietnamese Pho)",
        stampTitle: "VIETNAM FLAVOR VISA",
        stampDate: "HANOI • OFFICIAL CHECK",
        korean: "음식 비평가들은 신선한 허브를 넣는 것이 개인의 취향에 따라 쌀국수를 향긋하게 만든다고 보고한다.",
        fullEnglish: "Food critics report that adding fresh herbs makes pho aromatic depending on personal taste.",
        formula: "주어 + 동사 + that + [동명사 주어 + 동사(5형식) + 목적어 + 목적격보어 + 부사구]",
        formulaDetail: "주절: Food critics(주어) + report(동사) | that절: adding fresh herbs(주어) + makes(동사) + pho(목적어) + aromatic(목적격보어) + depending on personal taste(부사구)",
        chunks: [
          { id: "n4_1", text: "Food critics report", isSubjectVerb: true, roleLabel: "주어+동사", hint: "음식 비평가들은 전한다/보고한다 (주어+동사)" },
          { id: "n4_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "보고 내용 연결 that" },
          { id: "n4_3", text: "adding fresh herbs", isSubjectVerb: false, roleLabel: "that절 주어", hint: "신선한 허브들을 더하는 것이" },
          { id: "n4_4", text: "makes pho aromatic", isSubjectVerb: false, roleLabel: "5형식 동사+목적어+보어", hint: "쌀국수를 향긋하게 만든다 (make+O+C)" },
          { id: "n4_5", text: "depending on personal taste.", isSubjectVerb: false, roleLabel: "부사구", hint: "개인적 입맛(취향)에 따라서" }
        ],
        explanation: "5형식 문장(make + 목적어 pho + 목적격보어 aromatic 형용사) 구조로, 목적어를 어떤 상태로 만드는지 설명한 후 부사구가 뒤따릅니다."
      },
      {
        id: "neu_5",
        country: "튀르키예 🇹🇷",
        countryCode: "TUR",
        dish: "전통 케밥과 퓨전 요리 (Turkish Kebab)",
        stampTitle: "TURKEY BAZAAR PERMIT",
        stampDate: "ISTANBUL • IMMIGRATION",
        korean: "몇몇 역사학자들은 퓨전 케밥 조리법이 고유의 향신료를 유지하면서 현대의 입맛에 적응하고 있음을 관찰한다.",
        fullEnglish: "Several historians observe that modern kebab recipes adapt to global tastes while keeping original spices.",
        formula: "주어 + 동사 + that + [주어 + 동사 + 전치사구 + 부사절]",
        formulaDetail: "주절: Several historians(주어) + observe(동사) | that절: modern kebab recipes(주어) + adapt(동사) + to global tastes(전치사구) + while keeping original spices(접속사+분사구)",
        chunks: [
          { id: "n5_1", text: "Several historians observe", isSubjectVerb: true, roleLabel: "주어+동사", hint: "몇몇 역사학자들은 관찰한다 (주어+동사)" },
          { id: "n5_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "관찰한 사실을 전하는 that" },
          { id: "n5_3", text: "modern kebab recipes", isSubjectVerb: false, roleLabel: "that절 주어", hint: "현대의 케밥 조리법들이" },
          { id: "n5_4", text: "adapt to global tastes", isSubjectVerb: false, roleLabel: "that절 동사+전치사구", hint: "세계인의 입맛에 적응한다" },
          { id: "n5_5", text: "while keeping original spices.", isSubjectVerb: false, roleLabel: "동시동작 부사구", hint: "원래의 향신료들을 유지하면서" }
        ],
        explanation: "adapt to(~에 적응하다) 동사구 뒤에 'while + ~ing'(~하는 동안에/동시에) 형태의 부사구가 이어져 균형 잡힌 변화를 보여줍니다."
      }
    ]
  },
  con: {
    categoryName: "반대 입장",
    categoryEnglish: "Opposing / Con",
    themeColor: "var(--color-chili)",
    icon: "👎",
    description: "높은 나트륨, 자극적인 매운맛, 위생 문제, 음식 낭비에 대한 비판과 우려의 문장들입니다.",
    questions: [
      {
        id: "con_1",
        country: "중국 사천 🇨🇳",
        countryCode: "CHN",
        dish: "극도로 매운 사천 마라 훠궈 (Sichuan Spicy Hotpot)",
        stampTitle: "CHINA SPICE INSPECTION",
        stampDate: "CHENGDU • HEALTH WARNING",
        korean: "의료 전문가들은 지나치게 매운 훠궈를 먹는 것이 위벽을 손상시킨다고 경고한다.",
        fullEnglish: "Medical experts warn that eating excessively spicy hotpot damages the stomach lining.",
        formula: "주어 + 동사 + that + [동명사 주어 + 동사 + 목적어]",
        formulaDetail: "주절: Medical experts(주어) + warn(동사) | that절: eating excessively spicy hotpot(주어) + damages(동사) + the stomach lining(목적어)",
        chunks: [
          { id: "c1_1", text: "Medical experts warn", isSubjectVerb: true, roleLabel: "주어+동사", hint: "의료 전문가들은 경고한다 (주어+동사)" },
          { id: "c1_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "경고하는 내용을 이끄는 that" },
          { id: "c1_3", text: "eating excessively spicy hotpot", isSubjectVerb: false, roleLabel: "that절 주어", hint: "지나치게 매운 훠궈를 먹는 것이" },
          { id: "c1_4", text: "damages", isSubjectVerb: false, roleLabel: "that절 동사", hint: "손상시킨다 (단수동사)" },
          { id: "c1_5", text: "the stomach lining.", isSubjectVerb: false, roleLabel: "that절 목적어", hint: "위벽(위 내벽)을" }
        ],
        explanation: "경고 동사 warn 뒤에 that절이 오고, eating excessively spicy hotpot 전체가 동명사구 주어이므로 3인칭 단수형 damages를 씁니다."
      },
      {
        id: "con_2",
        country: "독일 🇩🇪",
        countryCode: "DEU",
        dish: "소금에 절인 전통 소시지와 사우어크라우트 (Preserved Sausages)",
        stampTitle: "GERMANY BORDER CONTROL",
        stampDate: "BERLIN • NUTRITION CHECK",
        korean: "식이요법사들은 전통 보존 소시지를 섭취하는 것이 혈압을 상승시킨다고 주장한다.",
        fullEnglish: "Dietitians argue that consuming traditional preserved sausages increases blood pressure.",
        formula: "주어 + 동사 + that + [동명사 주어 + 동사 + 목적어]",
        formulaDetail: "주절: Dietitians(주어) + argue(동사) | that절: consuming traditional preserved sausages(주어) + increases(동사) + blood pressure(목적어)",
        chunks: [
          { id: "c2_1", text: "Dietitians argue", isSubjectVerb: true, roleLabel: "주어+동사", hint: "식이요법사들은 주장한다 (주어+동사)" },
          { id: "c2_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "주장 내용 that" },
          { id: "c2_3", text: "consuming traditional preserved sausages", isSubjectVerb: false, roleLabel: "that절 주어", hint: "전통 저장 소시지를 섭취하는 것이" },
          { id: "c2_4", text: "increases", isSubjectVerb: false, roleLabel: "that절 동사", hint: "올린다 / 증가시킨다" },
          { id: "c2_5", text: "blood pressure.", isSubjectVerb: false, roleLabel: "that절 목적어", hint: "혈압을" }
        ],
        explanation: "sausages가 복수이지만 주어의 진짜 핵심은 consuming(섭취하는 것)이라는 동명사이므로 단수 동사 increases를 사용해야 합니다."
      },
      {
        id: "con_3",
        country: "영국 🇬🇧",
        countryCode: "GBR",
        dish: "기름진 피시 앤 칩스 (Greasy Fish & Chips)",
        stampTitle: "UNITED KINGDOM CUSTOMS",
        stampDate: "LONDON • HEALTH NOTICE",
        korean: "건강 운동가들은 튀긴 피시 앤 칩스를 자주 먹는 것이 심장 질환으로 이어진다고 주장한다.",
        fullEnglish: "Health activists claim that frequently eating fried fish and chips leads to heart problems.",
        formula: "주어 + 동사 + that + [부사 + 동명사 주어 + 동사구 + 전치사의 목적어]",
        formulaDetail: "주절: Health activists(주어) + claim(동사) | that절: frequently eating fried fish and chips(주어) + leads to(동사구) + heart problems(목적어)",
        chunks: [
          { id: "c3_1", text: "Health activists claim", isSubjectVerb: true, roleLabel: "주어+동사", hint: "건강 운동가들은 주장한다 (주어+동사)" },
          { id: "c3_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "주장 내용 that" },
          { id: "c3_3", text: "frequently eating fried fish and chips", isSubjectVerb: false, roleLabel: "that절 주어", hint: "튀긴 생선과 감자튀김을 자주 먹는 것이" },
          { id: "c3_4", text: "leads to", isSubjectVerb: false, roleLabel: "that절 동사구", hint: "~로 이어진다 / 초래한다" },
          { id: "c3_5", text: "heart problems.", isSubjectVerb: false, roleLabel: "전치사 목적어", hint: "심장 관련 질환들로" }
        ],
        explanation: "lead to는 '~을 유발하다, ~로 이어지다'라는 숙어로, to는 전치사이므로 뒤에 명사구(heart problems)가 따라옵니다."
      },
      {
        id: "con_4",
        country: "동남아 야시장 🥢",
        countryCode: "SEA",
        dish: "비위생적인 무허가 길거리 음식 (Uncertified Street Stalls)",
        stampTitle: "ASEAN TRAVEL IMMIGRATION",
        stampDate: "MARKET • HYGIENE CAUTION",
        korean: "많은 방문객들은 인증되지 않은 길거리 음식 노점들이 적절한 위생 기준을 갖추지 못했다고 불평한다.",
        fullEnglish: "Many visitors complain that uncertified street food stalls lack proper hygiene standards.",
        formula: "주어 + 동사 + that + [주어(복수명사) + 동사 + 목적어]",
        formulaDetail: "주절: Many visitors(주어) + complain(동사) | that절: uncertified street food stalls(주어) + lack(동사) + proper hygiene standards(목적어)",
        chunks: [
          { id: "c4_1", text: "Many visitors complain", isSubjectVerb: true, roleLabel: "주어+동사", hint: "많은 방문객들은 불평한다 (주어+동사)" },
          { id: "c4_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "불평하는 내용 연결 that" },
          { id: "c4_3", text: "uncertified street food stalls", isSubjectVerb: false, roleLabel: "that절 주어", hint: "인증받지 않은 길거리 음식 노점들이" },
          { id: "c4_4", text: "lack", isSubjectVerb: false, roleLabel: "that절 동사", hint: "결핍되어 있다 / 부족하다" },
          { id: "c4_5", text: "proper hygiene standards.", isSubjectVerb: false, roleLabel: "that절 목적어", hint: "적절한 위생 기준들을" }
        ],
        explanation: "stalls가 복수 주어이므로 복수형 동사 lack(~이 부족하다)을 원형 그대로 쓰며, 뒤에 목적어 proper hygiene standards가 옵니다."
      },
      {
        id: "con_5",
        country: "호화 연회식 🏰",
        countryCode: "GLO",
        dish: "낭비가 심한 대형 전통 코스 연회 (Lavish Banquet)",
        stampTitle: "WORLD HERITAGE COMMITTEE",
        stampDate: "GENEVA • ECO CONCERN",
        korean: "젊은 소비자들은 전통 코스 연회가 너무 많은 불필요한 음식물 쓰레기를 만든다고 말한다.",
        fullEnglish: "Young consumers say that traditional multi-course banquets produce too much unnecessary food waste.",
        formula: "주어 + 동사 + that + [주어 + 동사 + 수량형용사구 + 목적어]",
        formulaDetail: "주절: Young consumers(주어) + say(동사) | that절: traditional multi-course banquets(주어) + produce(동사) + too much unnecessary food waste(목적어)",
        chunks: [
          { id: "c5_1", text: "Young consumers say", isSubjectVerb: true, roleLabel: "주어+동사", hint: "젊은 소비자들은 말한다 (주어+동사)" },
          { id: "c5_2", text: "that", isSubjectVerb: false, roleLabel: "접속사", hint: "말하는 내용을 잇는 that" },
          { id: "c5_3", text: "traditional multi-course banquets", isSubjectVerb: false, roleLabel: "that절 주어", hint: "전통 코스 연회 요리가" },
          { id: "c5_4", text: "produce", isSubjectVerb: false, roleLabel: "that절 동사", hint: "발생시킨다 / 만들어낸다" },
          { id: "c5_5", text: "too much unnecessary food waste.", isSubjectVerb: false, roleLabel: "that절 목적어", hint: "너무 많은 불필요한 음식 쓰레기를" }
        ],
        explanation: "waste는 셀 수 없는 불가산 명사이므로 many가 아닌 'too much'로 꾸미며, 주어 banquets(복수)에 맞춰 produce가 옵니다."
      }
    ]
  }
};
