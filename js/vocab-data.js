const VOCAB_BANK = [
  // กลุ่มคำกริยา (Verbs)
  { en: "Adjust (v.)", th: "ปรับเปลี่ยน", ex: "You need to adjust your strategy to hit the goal.", ex_th: "คุณต้องปรับเปลี่ยนกลยุทธ์เพื่อให้บรรลุเป้าหมาย" },
  { en: "Enable (v.)", th: "มอบอำนาจ", ex: "The new system will enable the staff to work remotely.", ex_th: "ระบบใหม่จะมอบอำนาจให้พนักงานสามารถทำงานจากระยะไกลได้" },
  { en: "Maintain (v.)", th: "บำรุงรักษา", ex: "It is essential to maintain the equipment regularly.", ex_th: "จำเป็นอย่างยิ่งที่จะต้องบำรุงรักษาอุปกรณ์อย่างสม่ำเสมอ" },
  { en: "Affect (v.)", th: "ส่งผลกระทบ", ex: "Rising costs will affect our annual budget.", ex_th: "ค่าใช้จ่ายที่เพิ่มขึ้นจะส่งผลกระทบต่องบประมาณประจำปีของเรา" },
  { en: "Appeal (v.)", th: "วิงวอน", ex: "The charity had to appeal for urgent donations.", ex_th: "องค์กรการกุศลต้องวิงวอนขอเงินบริจาคอย่างเร่งด่วน" },
  { en: "Restore (v.)", th: "ฟื้นฟู", ex: "The government plans to restore the historic building.", ex_th: "รัฐบาลมีแผนที่จะฟื้นฟูอาคารประวัติศาสตร์แห่งนี้" },
  { en: "Suffer (v.)", th: "ทนทุกข์ทรมาน", ex: "The crops suffer from the lack of rain this season.", ex_th: "พืชผลต้องทนทุกข์ทรมานจากการขาดแคลนฝนในฤดูกาลนี้" },
  { en: "Ensure (v.)", th: "ทำให้มั่นใจ", ex: "Please check the data to ensure accuracy.", ex_th: "กรุณาตรวจสอบข้อมูลเพื่อให้มั่นใจในความถูกต้อง" },
  { en: "Alter (v.)", th: "เปลี่ยนแปลง", ex: "We had to alter the schedule due to the delay.", ex_th: "เราต้องเปลี่ยนแปลงตารางเวลาเนื่องจากความล่าช้า" },

  // กลุ่มคำนาม (Nouns)
  { en: "Balance (n.)", th: "สมดุล", ex: "It is important to keep a healthy work-life balance.", ex_th: "เป็นเรื่องสำคัญที่จะต้องรักษาสมดุลระหว่างชีวิตและการทำงานให้ดี" },
  { en: "Current (n.)", th: "ปัจจุบัน", ex: "We are focusing on current market demands.", ex_th: "เรากำลังมุ่งเน้นไปที่ความต้องการของตลาดในปัจจุบัน" },
  { en: "Monitor (n.)", th: "เฝ้าสังเกต", ex: "The monitor showed a stable heart rate.", ex_th: "เครื่องเฝ้าสังเกตแสดงอัตราการเต้นของหัวใจที่คงที่" },
  { en: "Anxiety (n.)", th: "ความวิตกกังวล", ex: "Public speaking often causes great anxiety.", ex_th: "การพูดในที่สาธารณะมักทำให้เกิดความวิตกกังวลอย่างมาก" },
  { en: "Treatment (n.)", th: "การรักษา", ex: "The doctor recommended a new treatment for the illness.", ex_th: "แพทย์แนะนำวิธีการรักษาแบบใหม่สำหรับอาการป่วยนี้" },
  { en: "State (n.)", th: "สถานะ", ex: "The economy is in a state of rapid growth.", ex_th: "เศรษฐกิจกำลังอยู่ในสถานะของการเติบโตอย่างรวดเร็ว" },
  { en: "Faith (n.)", th: "ศรัทธา", ex: "She never lost faith in her team.", ex_th: "เธอไม่เคยสูญเสียศรัทธาในทีมของเธอเลย" },
  { en: "Infection (n.)", th: "การติดเชื้อ", ex: "The doctor prescribed antibiotics to fight the infection.", ex_th: "แพทย์สั่งยาปฏิชีวนะเพื่อต่อสู้กับการติดเชื้อ" },
  { en: "Factor (n.)", th: "ปัจจัย", ex: "Price is a key factor in our decision-making.", ex_th: "ราคาเป็นปัจจัยสำคัญในการตัดสินใจของเรา" },
  { en: "Needle (n.)", th: "เข็มฉีดยา", ex: "She felt a slight pinch from the needle.", ex_th: "เธอรู้สึกเจ็บจี๊ดเล็กน้อยจากเข็มฉีดยา" },
  { en: "Expectation (n.)", th: "ความคาดหวัง", ex: "The service exceeded my expectations.", ex_th: "บริการนี้เหนือกว่าความคาดหวังของฉันมาก" },

  // กลุ่มคำคุณศัพท์ (Adjectives)
  { en: "Crucial (adj.)", th: "ร้ายแรง (หรือ สำคัญยิ่ง)", ex: "Time is a crucial factor in this experiment.", ex_th: "เวลาเป็นปัจจัยที่สำคัญยิ่งในการทดลองนี้" },
  { en: "Conventional (adj.)", th: "ตามแบบแผน", ex: "She prefers conventional methods of teaching.", ex_th: "เธอชอบวิธีการสอนตามแบบแผนเดิม" },
  { en: "Gradual (adj.)", th: "ค่อยเป็นค่อยไป", ex: "We saw a gradual improvement in his grades.", ex_th: "เราเห็นการพัฒนาที่เป็นไปอย่างค่อยเป็นค่อยไปในเกรดของเขา" },
  { en: "Practical (adj.)", th: "ได้ผลจริง", ex: "This plan is practical for our budget.", ex_th: "แผนนี้เป็นแผนที่ได้ผลจริงสำหรับงบประมาณของเรา" },
  { en: "Aware (adj.)", th: "ตระหนัก", ex: "Everyone should be aware of the safety rules.", ex_th: "ทุกคนควรตระหนักถึงกฎความปลอดภัย" },
  { en: "Valid (adj.)", th: "ถูกต้อง", ex: "Your argument is perfectly valid.", ex_th: "ข้อโต้แย้งของคุณถูกต้องอย่างสมบูรณ์" },
  { en: "Medical (adj.)", th: "ทางการแพทย์", ex: "He is seeking medical advice for his back pain.", ex_th: "เขากำลังขอคำแนะนำทางการแพทย์สำหรับอาการปวดหลัง" },
  { en: "Potential (adj.)", th: "ศักยภาพ", ex: "The new software has great potential for growth.", ex_th: "ซอฟต์แวร์ใหม่นี้มีศักยภาพที่ยอดเยี่ยมในการเติบโต" },
  { en: "Massive (adj.)", th: "มหึมา", ex: "The storm caused massive damage to the city.", ex_th: "พายุสร้างความเสียหายอันมหึมาให้กับเมือง" },
  { en: "Artificial (adj.)", th: "เทียม", ex: "The athlete uses an artificial limb.", ex_th: "นักกีฬาคนนั้นใช้แขนขาเทียม" },
  { en: "Poisonous (adj.)", th: "เป็นพิษ", ex: "Some species of snakes are highly poisonous.", ex_th: "งูบางสายพันธุ์มีพิษร้ายแรงมาก" },

  // กลุ่มคำวิเศษณ์ (Adverbs)
  { en: "Eventually (adv.)", th: "ในตอนท้าย", ex: "He eventually realized his mistake.", ex_th: "ในตอนท้ายเขาก็ตระหนักถึงความผิดพลาดของตัวเอง" }
];
