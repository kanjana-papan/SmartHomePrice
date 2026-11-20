const ML_WEIGHTS = {
  "intercept": 1.5606074223433417,
  "num": {
    "LotArea": 3.7747836246531333e-06,
    "OverallQual": 0.10390779809965625,
    "OverallCond": 0.06384076990168137,
    "YearBuilt": 0.004107502401479278,
    "YearRemodAdd": 0.00041667232544384406,
    "GrLivArea": 0.00031651535011658705,
    "FullBath": -0.004031855671362105,
    "HalfBath": -0.008388920458413975,
    "BedroomAbvGr": -0.019771301961871005,
    "GarageCars": 0.044418362443908246
  },
  "cat": {
    "Neighborhood_Blmngtn": -0.00037788445205969696,
    "Neighborhood_Blueste": -0.0002033255469924227,
    "Neighborhood_BrDale": -0.0029882633076605543,
    "Neighborhood_BrkSide": 0.0022174894647744264,
    "Neighborhood_ClearCr": 0.0009309517325528013,
    "Neighborhood_CollgCr": -0.002607340555234549,
    "Neighborhood_Crawfor": 0.00881979400764912,
    "Neighborhood_Edwards": -0.009788368185140941,
    "Neighborhood_Gilbert": -0.00635602636407229,
    "Neighborhood_IDOTRR": -0.003640684645639178,
    "Neighborhood_MeadowV": -0.003916718513125753,
    "Neighborhood_Mitchel": -0.0020857393046918296,
    "Neighborhood_NAmes": 0.005866096582995982,
    "Neighborhood_NPkVill": -8.001384723196303e-05,
    "Neighborhood_NWAmes": 0.0002433757846197405,
    "Neighborhood_NoRidge": 0.0020268239571059883,
    "Neighborhood_NridgHt": 0.010801180199402245,
    "Neighborhood_OldTown": -0.002510854823268563,
    "Neighborhood_SWISU": -0.0003221002133625287,
    "Neighborhood_Sawyer": -0.0015604846678910283,
    "Neighborhood_SawyerW": -0.0029617797904043673,
    "Neighborhood_Somerst": 0.0008177249857395644,
    "Neighborhood_StoneBr": 0.0043499841621302176,
    "Neighborhood_Timber": 0.001501159995617227,
    "Neighborhood_Veenker": 0.0018250033441883431,
    "BldgType_1Fam": 0.017683444820261525,
    "BldgType_2fmCon": -0.0020410318807938146,
    "BldgType_Duplex": -0.007432919145281592,
    "BldgType_Twnhs": -0.006717415968188371,
    "BldgType_TwnhsE": -0.0014920778259977943,
    "HouseStyle_1.5Fin": -0.0017007012655696017,
    "HouseStyle_1.5Unf": 0.00114937210103563,
    "HouseStyle_1Story": 0.02026887745879449,
    "HouseStyle_2.5Fin": -0.0005564352125973054,
    "HouseStyle_2.5Unf": 0.0003430957479051655,
    "HouseStyle_2Story": -0.020566073870874543,
    "HouseStyle_SFoyer": -0.0005793620901976754,
    "HouseStyle_SLvl": 0.001641227131503718
  }
};

const GROUPS = {
  small: {
    th: "บ้านขนาดเล็ก",
    en: "Small Home",
    description_th: "เหมาะกับคนโสด คู่รัก หรือผู้ที่ต้องการบ้านขนาดกะทัดรัด งบประมาณเริ่มต้นเข้าถึงง่าย",
    description_en: "For singles, couples, or people who prefer a compact, budget-friendly home.",
    styles: ["1Story", "1.5Fin", "SLvl"],
    fallback: "static/images/fallback-small.svg",
    defaults: {
      bedrooms: 2, bathrooms: 1, area: 850, lot_area: 4500,
      quality: 4, condition: 5, year_built: 1978, garage_cars: 1,
      house_style: "1Story", building_type: "1Fam", neighborhood: "Edwards"
    }
  },
  family: {
    th: "บ้านสำหรับครอบครัว",
    en: "Family Home",
    description_th: "เน้นพื้นที่ใช้สอยและจำนวนห้องที่รองรับสมาชิกในครอบครัวได้อย่างลงตัว",
    description_en: "More living space and rooms for family members.",
    styles: ["1Story", "2Story", "1.5Fin"],
    fallback: "static/images/fallback-family.svg",
    defaults: {
      bedrooms: 3, bathrooms: 2, area: 1550, lot_area: 8500,
      quality: 6, condition: 6, year_built: 2002, garage_cars: 2,
      house_style: "2Story", building_type: "1Fam", neighborhood: "CollgCr"
    }
  },
  premium: {
    th: "บ้านขนาดใหญ่และคุณภาพสูง",
    en: "Large & Premium Home",
    description_th: "เน้นพื้นที่กว้างขวาง วัสดุเกรดพรีเมียม ทำเลดี และสภาพบ้านสมบูรณ์",
    description_en: "Prioritizes spacious areas, premium materials, and excellent condition.",
    styles: ["2Story", "2.5Fin", "1.5Fin"],
    fallback: "static/images/fallback-premium.svg",
    defaults: {
      bedrooms: 4, bathrooms: 3, area: 2600, lot_area: 13500,
      quality: 8, condition: 7, year_built: 2008, garage_cars: 3,
      house_style: "2Story", building_type: "1Fam", neighborhood: "NoRidge"
    }
  },
  renovation: {
    th: "บ้านเก่าหรือบ้านสำหรับปรับปรุง",
    en: "Older / Renovation Home",
    description_th: "มองหาบ้านราคาย่อมเยา อายุเยอะ เหมาะสำหรับรีโนเวทตามสไตล์ที่ชอบ",
    description_en: "Looks for affordable older homes ready to be renovated.",
    styles: ["1Story", "1.5Unf", "2Story", "SFoyer"],
    fallback: "static/images/fallback-renovation.svg",
    defaults: {
      bedrooms: 2, bathrooms: 1, area: 950, lot_area: 6000,
      quality: 3, condition: 4, year_built: 1945, garage_cars: 0,
      house_style: "1.5Unf", building_type: "1Fam", neighborhood: "OldTown"
    }
  },
  investment: {
    th: "บ้านเพื่อการลงทุน",
    en: "Investment Home",
    description_th: "พิจารณาราคาซื้อที่คุ้มค่า ประเภทอาคาร และศักยภาพการปล่อยเช่า",
    description_en: "Considers purchase value, property type, and rental potential.",
    styles: ["1Story", "2Story", "TwnhsE", "TwnhsI"],
    fallback: "static/images/fallback-investment.svg",
    defaults: {
      bedrooms: 2, bathrooms: 1.5, area: 1150, lot_area: 3200,
      quality: 5, condition: 5, year_built: 1995, garage_cars: 1,
      house_style: "2Story", building_type: "TwnhsE", neighborhood: "SawyerW"
    }
  }
};

const HOUSE_STYLE_LABELS = {
  "1Story": { th: "บ้านชั้นเดียว (One-story)", en: "One-story" },
  "1.5Fin": { th: "บ้านชั้นเดียวครึ่ง ชั้นบนตกแต่งแล้ว (1.5-story Finished)", en: "1.5-story, finished upper level" },
  "1.5Unf": { th: "บ้านชั้นเดียวครึ่ง ชั้นบนยังไม่ตกแต่ง (1.5-story Unfinished)", en: "1.5-story, unfinished upper level" },
  "2Story": { th: "บ้านสองชั้น (Two-story)", en: "Two-story" },
  "2.5Fin": { th: "บ้านสองชั้นครึ่ง ตกแต่งแล้ว (2.5-story Finished)", en: "2.5-story, finished" },
  "2.5Unf": { th: "บ้านสองชั้นครึ่ง ยังไม่ตกแต่ง (2.5-story Unfinished)", en: "2.5-story, unfinished" },
  "SFoyer": { th: "บ้านเล่นระดับโถงทางเข้า (Split Foyer)", en: "Split-foyer" },
  "SLvl": { th: "บ้านเล่นระดับหลายชั้น (Split Level)", en: "Split-level" }
};

const BUILDING_TYPES = {
  "1Fam": { th: "บ้านเดี่ยวสำหรับครอบครัวเดียว (Single-family)", en: "Single-family detached" },
  "2FmCon": { th: "บ้านดัดแปลงสำหรับสองครอบครัว (Two-family Conversion)", en: "Two-family conversion" },
  "Duplx": { th: "บ้านแฝด / ดูเพล็กซ์ (Duplex)", en: "Duplex" },
  "TwnhsE": { th: "ทาวน์เฮาส์หลังริม (End-unit Townhouse)", en: "End-unit townhouse" },
  "TwnhsI": { th: "ทาวน์เฮาส์หลังกลาง (Interior Townhouse)", en: "Interior townhouse" }
};

const NEIGHBORHOOD_LABELS = {
  "Blmngtn": "Bloomington Heights (บลูมิงตัน ไฮทส์)",
  "Blueste": "Bluestem (บลูสเต็ม)",
  "BrDale": "Briardale (ไบรเออร์เดล)",
  "BrkSide": "Brookside (บรูคไซด์)",
  "ClearCr": "Clear Creek (เคลียร์ ครีก)",
  "CollgCr": "College Creek (คอลเลจ ครีก)",
  "Crawfor": "Crawford (ครอว์ฟอร์ด)",
  "Edwards": "Edwards (เอ็ดเวิร์ดส์)",
  "Gilbert": "Gilbert (กิลเบิร์ต)",
  "IDOTRR": "Iowa DOT and Rail Road (ไอโอวา ดอท แอนด์ เรล โรด)",
  "MeadowV": "Meadow Village (เมโดว์ วิลเลจ)",
  "Mitchel": "Mitchell (มิตเชลล์)",
  "NAmes": "North Ames (นอร์ท เอมส์)",
  "NoRidge": "Northridge (นอร์ท ริดจ์)",
  "NPkVill": "Northpark Villa (นอร์ทพาร์ก วิลลา)",
  "NridgHt": "Northridge Heights (นอร์ท ริดจ์ ไฮทส์)",
  "NWAmes": "Northwest Ames (นอร์ทเวสต์ เอมส์)",
  "OldTown": "Old Town (โอลด์ทาวน์)",
  "SWISU": "South and West of Iowa State University (เซาท์ แอนด์ เวสต์ ออฟ ไอโอวา สเตต ยูนิเวอร์ซิตี้)",
  "Sawyer": "Sawyer (ซอว์เยอร์)",
  "SawyerW": "Sawyer West (ซอว์เยอร์ เวสต์)",
  "Somerst": "Somerset (ซัมเมอร์เซต)",
  "StoneBr": "Stone Brook (สโตน บรูค)",
  "Timber": "Timberland (ทิมเบอร์แลนด์)",
  "Veenker": "Veenker (วีนเคอร์)"
};

function u(id) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;
}

const HOUSE_GALLERY = {
  small: [
    { url: u("1568605114967-8130f3a36994"), title_th: "บ้านชั้นเดียวสไตล์อบอุ่น", title_en: "Cozy single-story cottage" },
    { url: u("1570129477492-45c003edd2be"), title_th: "บ้านเดี่ยวขนาดกะทัดรัดพร้อมสนามหญ้า", title_en: "Compact detached home with lawn" },
    { url: u("1588880331179-bc9b93a8cb5e"), title_th: "บ้านชั้นเดียวโทนสีสว่าง", title_en: "Bright single-story home" },
    { url: u("1598228723793-52759bba239c"), title_th: "บ้านขนาดเล็กสำหรับเริ่มต้นครอบครัว", title_en: "Starter compact house" },
    { url: u("1513584684374-8bab748fbf90"), title_th: "บ้านชั้นเดียวสไตล์มินิมอล", title_en: "Minimalist single-story house" },
    { url: u("1518780664697-55e3ad937233"), title_th: "บ้านคอทเทจหลังเล็กท่ามกลางธรรมชาติ", title_en: "Small cottage surrounded by trees" },
    { url: u("1449844908441-8829872d2607"), title_th: "บ้านชั้นเดียวพร้อมระเบียงหน้าบ้าน", title_en: "Single-story home with front porch" },
    { url: u("1572120360610-d971b9d7767c"), title_th: "บ้านเดี่ยวขนาดพอดีตัว", title_en: "Right-sized detached house" },
    { url: u("1583608205776-bfd35f0d9f83"), title_th: "บ้านชั้นเดียวร่วมสมัย", title_en: "Contemporary one-story home" },
    { url: u("1592595896551-12b371d546d5"), title_th: "บ้านชั้นเดียวพร้อมที่จอดรถ", title_en: "Single-story home with driveway" },
    { url: u("1605276374104-dee2a0ed3cd6"), title_th: "บ้านขนาดกะทัดรัดดูแลง่าย", title_en: "Easy-care compact residence" },
    { url: u("1558036117-15d82a90b9b1"), title_th: "บ้านชั้นเดียวบรรยากาศเงียบสงบ", title_en: "Quiet single-level home" }
  ],
  family: [
    { url: u("1600585154340-be6161a56a0c"), title_th: "บ้านเดี่ยวสองชั้นสำหรับครอบครัว", title_en: "Two-story family residence" },
    { url: u("1600596542815-ffad4c1539a9"), title_th: "บ้านครอบครัวพร้อมสวนหน้าบ้าน", title_en: "Family home with front garden" },
    { url: u("1564013799919-ab600027ffc6"), title_th: "บ้านสองชั้นพื้นที่ใช้สอยกว้าง", title_en: "Spacious two-story home" },
    { url: u("1576941089067-2de3c901e126"), title_th: "บ้านชานเมืองสำหรับครอบครัวใหญ่", title_en: "Suburban family house" },
    { url: u("1600047509807-ba8f99d2cdde"), title_th: "บ้านเดี่ยวสไตล์โมเดิร์นแฟมิลี่", title_en: "Modern family detached home" },
    { url: u("1600566753190-17f0baa2a6c3"), title_th: "บ้านสองชั้นพร้อมโรงจอดรถคู่", title_en: "Two-story home with double garage" },
    { url: u("1580587771525-78b9dba3b914"), title_th: "บ้านครอบครัวอบอุ่นพร้อมพื้นที่พักผ่อน", title_en: "Warm family home with yard" },
    { url: u("1512917774080-9991f1c4c750"), title_th: "บ้านเดี่ยวสองชั้นดีไซน์โปร่งสบาย", title_en: "Airy two-story detached house" },
    { url: u("1600585154526-990dced4db0d"), title_th: "บ้านครอบครัวในย่านที่อยู่อาศัย", title_en: "Neighborhood family residence" },
    { url: u("1600573472592-401b489a3cdc"), title_th: "บ้านสองชั้นบรรยากาศร่มรื่น", title_en: "Shaded two-story family home" },
    { url: u("1599427303058-f04cbcf4756f"), title_th: "บ้านเดี่ยวพร้อมลานกิจกรรมครอบครัว", title_en: "Detached home with family patio" },
    { url: u("1582268611958-ebfd161ef9cf"), title_th: "บ้านสองชั้นสไตล์คลาสสิกแฟมิลี่", title_en: "Classic two-story family home" }
  ],
  premium: [
    { url: u("1613490493576-7fde63acd811"), title_th: "คฤหาสน์โมเดิร์นพร้อมสระว่ายน้ำ", title_en: "Modern luxury villa with pool" },
    { url: u("1613977257363-707ba9348227"), title_th: "บ้านหรูขนาดใหญ่สถาปัตยกรรมร่วมสมัย", title_en: "Contemporary luxury estate" },
    { url: u("1600607687939-ce8a6c25118c"), title_th: "บ้านระดับพรีเมียมกระจกบานใหญ่", title_en: "Premium glass-facade residence" },
    { url: u("1600585153490-76fb20a32601"), title_th: "บ้านหรูสองชั้นครึ่งพร้อมสวนภูมิทัศน์", title_en: "Luxury estate with landscaped garden" },
    { url: u("1600566753086-00f18fb6b3ea"), title_th: "บ้านเดี่ยวขนาดใหญ่เกรดพรีเมียม", title_en: "High-end spacious detached home" },
    { url: u("1602343168117-bb8ffe3e2e9f"), title_th: "บ้านหรูสไตล์รีสอร์ตส่วนตัว", title_en: "Private resort-style luxury home" },
    { url: u("1605146769289-440113cc3d00"), title_th: "บ้านขนาดใหญ่พิเศษย่านทำเลทอง", title_en: "Executive residence in prime area" },
    { url: u("1600047509358-9dc75507daeb"), title_th: "บ้านโมเดิร์นลักชัวรีสองชั้น", title_en: "Two-story modern luxury home" },
    { url: u("1600585152220-90363fe7e115"), title_th: "บ้านพรีเมียมตกแต่งครบครัน", title_en: "Fully finished luxury residence" },
    { url: u("1613545325278-f24b0cae1224"), title_th: "บ้านหรูพร้อมพื้นที่รับรองขนาดใหญ่", title_en: "Grand home with entertainment deck" },
    { url: u("1600210492486-724fe5c67fb0"), title_th: "บ้านระดับไฮเอนด์ดีไซน์โดดเด่น", title_en: "Architectural high-end home" },
    { url: u("1600607687644-c7171b42498f"), title_th: "บ้านหรูพื้นที่กว้างขวางเป็นส่วนตัว", title_en: "Expansive private luxury estate" }
  ],
  renovation: [
    { url: u("1510798831971-661eb04b3739"), title_th: "บ้านไม้คลาสสิกเหมาะสำหรับรีโนเวท", title_en: "Classic timber house for renovation" },
    { url: u("1518780664697-55e3ad937233"), title_th: "บ้านเก่าทรงวินเทจโครงสร้างแข็งแรง", title_en: "Vintage home with solid structure" },
    { url: u("1464146072230-91cabc968266"), title_th: "บ้านอิฐดั้งเดิมพร้อมปรับปรุงใหม่", title_en: "Traditional brick fixer-upper" },
    { url: u("1475855581690-80accde3ae2b"), title_th: "บ้านสองชั้นสไตล์ย้อนยุค", title_en: "Retro two-story house" },
    { url: u("1523217582562-09d0def993a6"), title_th: "บ้านเก่าในย่านชุมชนดั้งเดิม", title_en: "Older home in historic district" },
    { url: u("1505843513577-22bb7d21e455"), title_th: "บ้านชั้นเดียวครึ่งรอการตกแต่งชั้นบน", title_en: "1.5-story house ready for upper finish" },
    { url: u("1494526585095-c41746248156"), title_th: "บ้านทรงโคโลเนียลเก่าแก่", title_en: "Older colonial-style residence" },
    { url: u("1480074568708-e7b720bb3f09"), title_th: "บ้านไม้สองชั้นพร้อมพื้นที่สวนรอบบ้าน", title_en: "Two-story wood home with large lot" },
    { url: u("1502005229762-cf1b2da7c5d6"), title_th: "บ้านเก่าเหมาะสำหรับรีโนเวทเพิ่มมูลค่า", title_en: "Value-add renovation property" },
    { url: u("1513694203232-719a280e022f"), title_th: "บ้านสไตล์ดั้งเดิมรอการปรับโฉม", title_en: "Traditional home ready for makeover" },
    { url: u("1430285561322-7808604715df"), title_th: "บ้านอิฐแดงคลาสสิกอายุหลายสิบปี", title_en: "Decades-old classic red brick house" },
    { url: u("1531971589569-0d9370cbe1e5"), title_th: "บ้านเก่าบรรยากาศอบอุ่นสำหรับปรับปรุง", title_en: "Charming older home for remodeling" }
  ],
  investment: [
    { url: u("1545324418-cc1a3fa10c00"), title_th: "ทาวน์เฮาส์สมัยใหม่ทำเลปล่อยเช่าง่าย", title_en: "Modern townhouse for rental yield" },
    { url: u("1460317442991-0ec209397118"), title_th: "อาคารทาวน์โฮมเรียงต่อกัน", title_en: "Row of investment townhomes" },
    { url: u("1574362848149-11496d93a7c7"), title_th: "ทาวน์เฮาส์สองชั้นพร้อมที่จอดรถ", title_en: "Two-story townhouse with parking" },
    { url: u("1515263487990-61b07816b324"), title_th: "บ้านแฝดดูเพล็กซ์สำหรับแบ่งเช่า", title_en: "Duplex property for dual income" },
    { url: u("1486406146926-c627a92ad1ab"), title_th: "อสังหาริมทรัพย์เพื่อการลงทุนในย่านธุรกิจ", title_en: "Urban investment residential block" },
    { url: u("1560518883-ce09059eeffa"), title_th: "ทาวน์เฮาส์หลังริมพื้นที่ใช้สอยคุ้มค่า", title_en: "End-unit townhouse with high ROI" },
    { url: u("1582407947304-fd86f028f716"), title_th: "บ้านพักอาศัยย่านชุมชนใกล้มหาวิทยาลัย", title_en: "Student-area rental property" },
    { url: u("1560448204-e02f11c3d0e2"), title_th: "ทาวน์โฮมดีไซน์ร่วมสมัยดูแลรักษาง่าย", title_en: "Low-maintenance modern townhome" },
    { url: u("1554995207-c18c203602cb"), title_th: "บ้านสำหรับปล่อยเช่าระยะยาว", title_en: "Long-term rental residential unit" },
    { url: u("1568605117036-5fe5e7bab0b7"), title_th: "บ้านแฝดสองชั้นสร้างกระแสเงินสด", title_en: "Cash-flow two-story duplex" },
    { url: u("1570129477492-45c003edd2be"), title_th: "บ้านเดี่ยวขนาดเล็กซื้อง่ายขายคล่อง", title_en: "High-liquidity compact single home" },
    { url: u("1600585154340-be6161a56a0c"), title_th: "บ้านเดี่ยวย่านเติบโตสูงเหมาะเก็งกำไร", title_en: "High-growth neighborhood house" }
  ]
};
