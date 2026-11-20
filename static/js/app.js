let currentLang = localStorage.getItem("shp_lang") || "th";

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("shp_lang", lang);
  document.documentElement.lang = lang;

  const toggleBtn = document.getElementById("langToggle");
  if (toggleBtn) toggleBtn.textContent = lang === "th" ? "EN" : "TH";

  document.querySelectorAll("[data-th]").forEach((el) => {
    const val = el.getAttribute(`data-${lang}`);
    if (!val) return;
    if (el.tagName === "INPUT" && el.hasAttribute("placeholder")) {
      el.placeholder = val;
    } else if (val.includes("<br>")) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
}

function predictHomePrice(params) {
  let logPrice = ML_WEIGHTS.intercept;
  const num = ML_WEIGHTS.num;
  const cat = ML_WEIGHTS.cat;

  const fullBath = Math.floor(params.bathrooms);
  const halfBath = (params.bathrooms - fullBath) >= 0.5 ? 1 : 0;

  logPrice += (num.LotArea || 0) * params.lot_area;
  logPrice += (num.OverallQual || 0) * params.quality;
  logPrice += (num.OverallCond || 0) * params.condition;
  logPrice += (num.YearBuilt || 0) * params.year_built;
  logPrice += (num.YearRemodAdd || 0) * params.year_built;
  logPrice += (num.GrLivArea || 0) * params.area;
  logPrice += (num.FullBath || 0) * fullBath;
  logPrice += (num.HalfBath || 0) * halfBath;
  logPrice += (num.BedroomAbvGr || 0) * params.bedrooms;
  logPrice += (num.GarageCars || 0) * params.garage_cars;

  // Map BldgType code to training OneHotEncoder category name
  const bldgMap = {
    "1Fam": "BldgType_1Fam",
    "2FmCon": "BldgType_2fmCon",
    "Duplx": "BldgType_Duplex",
    "TwnhsI": "BldgType_Twnhs",
    "TwnhsE": "BldgType_TwnhsE"
  };

  logPrice += cat[`Neighborhood_${params.neighborhood}`] || 0;
  logPrice += cat[bldgMap[params.building_type] || `BldgType_${params.building_type}`] || 0;
  logPrice += cat[`HouseStyle_${params.house_style}`] || 0;

  const price = Math.max(25000, Math.expm1(logPrice));
  return Math.round(price);
}

function initIndexPage() {
  const groupGrid = document.getElementById("groupGrid");
  if (!groupGrid) return;

  // Populate Group Cards
  Object.entries(GROUPS).forEach(([key, group]) => {
    const label = document.createElement("label");
    label.className = "group-card";
    label.innerHTML = `
      <input type="radio" name="customer_group" value="${key}" ${key === "family" ? "checked" : ""}>
      <strong data-th="${group.th}" data-en="${group.en}">${group.th}</strong>
      <small data-th="${group.description_th}" data-en="${group.description_en}">${group.description_th}</small>
      <span class="select-indicator">✓</span>
    `;
    groupGrid.appendChild(label);
  });

  // Populate Neighborhoods
  const nbSelect = document.getElementById("inputNeighborhood");
  Object.entries(NEIGHBORHOOD_LABELS).forEach(([code, text]) => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = text;
    if (code === "CollgCr") opt.selected = true;
    nbSelect.appendChild(opt);
  });

  // Populate Building Types
  const bldgSelect = document.getElementById("inputBuildingType");
  Object.entries(BUILDING_TYPES).forEach(([code, item]) => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.setAttribute("data-th", item.th);
    opt.setAttribute("data-en", item.en);
    opt.textContent = item.th;
    if (code === "1Fam") opt.selected = true;
    bldgSelect.appendChild(opt);
  });

  // Populate House Styles
  const styleSelect = document.getElementById("inputHouseStyle");
  Object.entries(HOUSE_STYLE_LABELS).forEach(([code, item]) => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.setAttribute("data-th", item.th);
    opt.setAttribute("data-en", item.en);
    opt.textContent = item.th;
    if (code === "2Story") opt.selected = true;
    styleSelect.appendChild(opt);
  });

  // Auto-fill defaults when customer group changes
  groupGrid.addEventListener("change", (e) => {
    if (e.target.name !== "customer_group") return;
    const g = GROUPS[e.target.value];
    if (!g) return;
    const d = g.defaults;
    document.getElementById("inputNeighborhood").value = d.neighborhood;
    document.getElementById("inputYearBuilt").value = d.year_built;
    document.getElementById("inputBuildingType").value = d.building_type;
    document.getElementById("inputHouseStyle").value = d.house_style;
    document.getElementById("inputArea").value = d.area;
    document.getElementById("inputLotArea").value = String(d.lot_area);
    document.getElementById("inputBedrooms").value = String(d.bedrooms);
    document.getElementById("inputBathrooms").value = String(d.bathrooms);
    document.getElementById("inputQuality").value = String(d.quality);
    document.getElementById("inputCondition").value = String(d.condition);
    document.getElementById("inputGarageCars").value = String(d.garage_cars);
  });
}

function initResultPage() {
  const resPrice = document.getElementById("resPrice");
  if (!resPrice) return;

  const qs = new URLSearchParams(window.location.search);
  const groupKey = GROUPS[qs.get("customer_group")] ? qs.get("customer_group") : "family";
  const group = GROUPS[groupKey];
  const def = group.defaults;

  const params = {
    customer_group: groupKey,
    budget: parseFloat(qs.get("budget")) || 0,
    neighborhood: qs.get("neighborhood") || def.neighborhood,
    year_built: parseInt(qs.get("year_built"), 10) || def.year_built,
    building_type: qs.get("building_type") || def.building_type,
    house_style: qs.get("house_style") || def.house_style,
    area: parseFloat(qs.get("area")) || def.area,
    lot_area: parseFloat(qs.get("lot_area")) || def.lot_area,
    bedrooms: parseInt(qs.get("bedrooms"), 10) || def.bedrooms,
    bathrooms: parseFloat(qs.get("bathrooms")) || def.bathrooms,
    quality: parseInt(qs.get("quality"), 10) || def.quality,
    condition: parseInt(qs.get("condition"), 10) || def.condition,
    garage_cars: qs.get("garage_cars") !== null && qs.get("garage_cars") !== ""
      ? parseInt(qs.get("garage_cars"), 10)
      : def.garage_cars
  };

  const estimated = predictHomePrice(params);
  resPrice.textContent = `$${estimated.toLocaleString("en-US")}`;

  // Customer group info
  const grpTitle = document.getElementById("resGroupTitle");
  grpTitle.setAttribute("data-th", group.th);
  grpTitle.setAttribute("data-en", group.en);
  grpTitle.textContent = group.th;

  const grpDesc = document.getElementById("resGroupDesc");
  grpDesc.setAttribute("data-th", group.description_th);
  grpDesc.setAttribute("data-en", group.description_en);
  grpDesc.textContent = group.description_th;

  // Key specs
  document.getElementById("resBedrooms").textContent = params.bedrooms;
  document.getElementById("resBathrooms").textContent = params.bathrooms;
  document.getElementById("resArea").textContent = params.area.toLocaleString("en-US");
  document.getElementById("resQuality").textContent = `${params.quality}/10`;

  // Full entered property details
  document.getElementById("resNeighborhood").textContent =
    NEIGHBORHOOD_LABELS[params.neighborhood] || params.neighborhood;
  document.getElementById("resYearBuilt").textContent = `ค.ศ. ${params.year_built}`;

  const bldgObj = BUILDING_TYPES[params.building_type] || { th: params.building_type, en: params.building_type };
  const bldgEl = document.getElementById("resBuildingType");
  bldgEl.setAttribute("data-th", bldgObj.th);
  bldgEl.setAttribute("data-en", bldgObj.en);
  bldgEl.textContent = bldgObj.th;

  const styleObj = HOUSE_STYLE_LABELS[params.house_style] || { th: params.house_style, en: params.house_style };
  const styleEl = document.getElementById("resHouseStyle");
  styleEl.setAttribute("data-th", styleObj.th);
  styleEl.setAttribute("data-en", styleObj.en);
  styleEl.textContent = styleObj.th;

  document.getElementById("resLotArea").textContent = `${params.lot_area.toLocaleString("en-US")} ตร.ฟุต`;
  document.getElementById("resConditionGarage").textContent =
    `สภาพ ${params.condition}/10 · จอดรถ ${params.garage_cars} คัน`;

  // Budget status
  const budgetStatusEl = document.getElementById("resBudgetStatus");
  const budgetValEl = document.getElementById("resBudgetVal");
  if (params.budget > 0) {
    const diff = params.budget - estimated;
    let thMsg, enMsg;
    if (diff >= 0) {
      thMsg = `ราคาประเมินอยู่ในงบประมาณที่ตั้งไว้ (มีงบคงเหลือประมาณ $${Math.round(diff).toLocaleString("en-US")})`;
      enMsg = `Within your budget (approx. $${Math.round(diff).toLocaleString("en-US")} remaining)`;
    } else {
      thMsg = `ราคาประเมินสูงกว่างบประมาณที่ตั้งไว้ประมาณ $${Math.round(Math.abs(diff)).toLocaleString("en-US")} (แนะนำลดขนาดพื้นที่ใช้สอยหรือเลือกย่านที่ราคาย่อมเยาลง)`;
      enMsg = `Above your budget by approx. $${Math.round(Math.abs(diff)).toLocaleString("en-US")} (consider smaller living area or more affordable neighborhood)`;
    }
    budgetStatusEl.setAttribute("data-th", thMsg);
    budgetStatusEl.setAttribute("data-en", enMsg);
    budgetStatusEl.textContent = thMsg;

    budgetValEl.style.display = "inline";
    budgetValEl.textContent = `Budget: $${Math.round(params.budget).toLocaleString("en-US")}`;
  } else {
    const thDef = "ไม่ได้ระบุงบประมาณ (แสดงราคาประเมินตามคุณลักษณะบ้านที่เลือก)";
    const enDef = "No budget provided (showing estimate based on selected features)";
    budgetStatusEl.setAttribute("data-th", thDef);
    budgetStatusEl.setAttribute("data-en", enDef);
    budgetStatusEl.textContent = thDef;
  }

  // Recommendations
  const recList = document.getElementById("resRecommendations");
  const recs = group.styles.slice(0, 3).map((code) => HOUSE_STYLE_LABELS[code] || { th: "บ้าน", en: "Home" });
  if (groupKey === "investment") {
    recs.push({ th: "ทาวน์เฮาส์หรือบ้านแฝดทำเลปล่อยเช่า", en: "Townhouse or duplex for rental yield" });
  } else if (groupKey === "renovation") {
    recs.push({ th: "บ้านอายุมากที่ควรตรวจสอบโครงสร้างก่อนรีโนเวท", en: "Older property; inspect structure before purchase" });
  }

  recs.forEach((rec) => {
    const div = document.createElement("div");
    div.className = "recommendation-item";
    div.innerHTML = `
      <span class="check">✓</span>
      <span>
        <b data-th="${rec.th}" data-en="${rec.en}">${rec.th}</b>
        <small data-th="ประเภทบ้านที่แนะนำจากเงื่อนไขกลุ่มลูกค้า" data-en="Suggested from customer-group rules">ประเภทบ้านที่แนะนำจากเงื่อนไขกลุ่มลูกค้า</small>
      </span>
    `;
    recList.appendChild(div);
  });

  // Gallery
  const galleryTitle = document.getElementById("resGalleryTitle");
  galleryTitle.setAttribute("data-th", `บ้านในกลุ่ม${group.th}`);
  galleryTitle.setAttribute("data-en", `${group.en} homes`);
  galleryTitle.textContent = `บ้านในกลุ่ม${group.th}`;

  const photos = HOUSE_GALLERY[groupKey] || HOUSE_GALLERY.family;
  document.getElementById("resGalleryCount").textContent = `${photos.length} ภาพ`;

  const galleryGrid = document.getElementById("resGalleryGrid");
  photos.forEach((photo) => {
    const btn = document.createElement("button");
    btn.className = "house-photo";
    btn.type = "button";
    btn.innerHTML = `
      <img src="${photo.url}" alt="${photo.title_en}" loading="lazy"
           onerror="this.onerror=null; this.src='${group.fallback}';">
      <span class="photo-caption">
        <b data-th="${photo.title_th}" data-en="${photo.title_en}">${photo.title_th}</b>
        <small data-th="ภาพตัวอย่างสำหรับกลุ่มลูกค้าที่เลือก" data-en="Example for your selected customer group">ภาพตัวอย่างสำหรับกลุ่มลูกค้าที่เลือก</small>
      </span>
    `;
    btn.addEventListener("click", () => openPhotoModal(photo));
    galleryGrid.appendChild(btn);
  });

  // Modal close handlers
  const modal = document.getElementById("photoModal");
  const closeBtn = modal.querySelector(".modal-close");
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

function openPhotoModal(photo) {
  const modal = document.getElementById("photoModal");
  const img = document.getElementById("modalImage");
  const cap = document.getElementById("modalCaption");
  img.src = photo.url;
  cap.textContent = currentLang === "th" ? photo.title_th : photo.title_en;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

document.addEventListener("DOMContentLoaded", () => {
  initIndexPage();
  initResultPage();
  applyLanguage(currentLang);

  const toggleBtn = document.getElementById("langToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      applyLanguage(currentLang === "th" ? "en" : "th");
    });
  }
});
