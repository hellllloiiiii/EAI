const tierOrder = ["starter", "workflows", "team", "advanced"];

// Supabase is optional: with no config the site runs exactly as before,
// saving progress to this device only.
const eaiConfig = window.EAI_CONFIG || {};
const sb = window.supabase && eaiConfig.supabaseUrl && eaiConfig.supabaseAnonKey
  ? window.supabase.createClient(eaiConfig.supabaseUrl, eaiConfig.supabaseAnonKey)
  : null;
let currentUser = null;

const industryOrder = [
  "Retail and sales",
  "Manufacturing",
  "Hospitality and tourism",
  "Banking and finance",
  "Healthcare",
  "Education",
  "Logistics",
  "Government services",
  "Small business",
  "Other"
];

const content = {
  en: {
    nav: ["Overview", "Course", "Profile", "Levels"],
    brandSubtitle: "AI training for working professionals",
    builtBy: "Built by",
    overviewEyebrow: "Learn how to use AI and optimize it in your everyday work and life",
    overviewTitle: "Learn to use AI at work, and home, even if you are starting from zero.",
    overviewBody:
      "Everday AI is a fluid, AI-powered course platform for non-technical professionals who want to understand today's AI tools and use them responsibly. It teaches what AI can do, how to write better prompts, how to apply AI to real workplace and home tasks, and how to avoid common privacy and accuracy mistakes. The more specific you are about your role, industry, company, and daily responsibilities, the better the training can personalize examples, prompts, and practice tasks to fit your real needs.",
    profileEyebrow: "Personalized path",
    profileTitle: "Tell us about your work",
    currentPath: "Current path",
    defaultPathTitle: "General workplace starter",
    defaultPathSubtitle: "Personalize the course to make the examples fit your work.",
    examplesFocus: "Examples will focus on",
    learnerSuffix: "learner",
    labels: {
      age: "Age",
      gender: "Gender",
      industry: "Industry",
      customIndustry: "Describe your industry",
      role: "Role",
      company: "Company",
      experience: "Experience"
    },
    placeholders: {
      age: "42",
      role: "Operations manager",
      customIndustry: "Renewable energy, legal services, beauty, agriculture...",
      company: "Paste your company website or describe what the company does.",
      experience: "I manage a small team and prepare weekly reports.",
      prompt: "Ask AI to help with a real task from your job."
    },
    genderOptions: [
      ["", "Prefer not to say"],
      ["Female", "Female"],
      ["Male", "Male"],
      ["Non-binary", "Non-binary"],
      ["Prefer to self-describe", "Prefer to self-describe"]
    ],
    personalize: "Personalize course",
    freeTier: "Free for every learner",
    courseTitle: "Start from zero, practice with your real work",
    courseDescription: "Everday AI works like a hybrid AI coaching assistant and trainer: it teaches the concepts, then coaches you through practice until you can use AI with real confidence and fluency in your everyday work.",
    progressLabel: "Course progress",
    lesson: "Lesson",
    durationLabel: "Duration",
    difficultyLabel: "Difficulty",
    capabilityLabel: "AI capabilities",
    readingEyebrow: "Readings and examples",
    readingTitle: "What to review",
    quizEyebrow: "Knowledge check",
    quizTitle: "Quiz checkpoint",
    durationFree: "30 minutes",
    durationPaid: "About 1 hour",
    difficulties: {
      starter: "Foundation",
      workflows: "Applied workplace fluency",
      team: "Manager and team fluency",
      advanced: "Technical confidence"
    },
    blocks: {
      learn: "Learn",
      practice: "Try it at work",
      local: "Local example"
    },
    fluencyCoach: "AI fluency coach",
    fluencyTitle: "Build practical AI fluency",
    coachNoteLabel: "Coach note",
    coachDrillLabel: "Practice drill",
    coachStandardLabel: "Fluency standard",
    coachNote: "Your goal is not just to know what AI is. Your goal is to know when to use it, how to ask clearly, how to challenge the output, and how to turn the answer into better work.",
    coachDrill: "Ask AI for one answer, one alternative, and one critique. Then compare the three and decide what you would actually use.",
    coachStandard: "A fluent user can frame a problem, give context, request a useful format, check assumptions, and improve the output in two or three rounds.",
    promptCoach: "Prompt coach",
    promptTitle: "Write a better request",
    useExample: "Use example",
    checkPrompt: "Check prompt",
    coachDefault: "A strong prompt includes the task, context, format, and what good output looks like.",
    promptGood:
      "This is a strong workplace prompt. It gives AI a task, context, output format, and quality target. Next step: remove private details before using it in a real tool.",
    promptImprove: "Good start. Add more detail for",
    promptStrongInclude: "Strong prompts usually include",
    promptAndTarget: "and a clear success target.",
    packageEyebrow: "Learning path",
    packageTitle: "Four levels, all free",
    packageDescription: "Move through the levels at your own pace. Each one builds on the last.",
    openTier: "Open level",
    levelLabel: "Level",
    currentLevel: "You are here",
    account: {
      eyebrow: "Your account",
      title: "Save your progress",
      email: "Email",
      password: "Password",
      signUp: "Create account",
      logIn: "Log in",
      logOut: "Log out",
      signedOut: "Create a free account to keep your progress on any device.",
      signedInAs: "Signed in as",
      checkEmail: "Account created. Open the confirmation email we sent you, click the link inside, then log in here.",
      authFailed: "That did not work. Check your email and password, then try again.",
      fillBoth: "Enter an email and a password with at least 8 characters.",
      notConfigured: "Online accounts are coming soon. For now, your progress is saved on this device.",
      loggedOut: "You are logged out. Your progress stays saved in your account."
    },
    promptChecks: {
      task: "task",
      context: "context",
      format: "format",
      quality: "quality target"
    },
    industries: {
      "Retail and sales": "Retail and sales",
      Manufacturing: "Manufacturing",
      "Hospitality and tourism": "Hospitality and tourism",
      "Banking and finance": "Banking and finance",
      Healthcare: "Healthcare",
      Education: "Education",
      Logistics: "Logistics",
      "Government services": "Government services",
      "Small business": "Small business",
      Other: "Other"
    },
    industryExamples: {
      "Retail and sales": "customer replies, product descriptions, daily sales summaries, and follow-up messages",
      Manufacturing: "shift handovers, defect summaries, safety reminders, and supplier updates",
      "Hospitality and tourism": "guest messages, booking explanations, review replies, and staff briefings",
      "Banking and finance": "policy explanations, client summaries, risk checklists, and internal updates",
      Healthcare: "patient-friendly explanations, appointment instructions, team notes, and admin summaries",
      Education: "lesson outlines, parent messages, learner feedback, and quiz drafts",
      Logistics: "shipment updates, delay explanations, route notes, and priority lists",
      "Government services": "citizen instructions, form explanations, service scripts, and public notices",
      "Small business": "marketing posts, customer service replies, invoices, and operating checklists",
      Other: "your specific work, company priorities, repeated tasks, and daily decisions"
    },
    packages: [
      { tier: "starter", title: "Starter", description: "AI basics, first prompts, privacy, and safe use." },
      { tier: "workflows", title: "Everyday workflows", description: "Email, reports, translation, spreadsheets, and everyday office workflows." },
      { tier: "team", title: "Team", description: "Manager playbooks, team prompt libraries, and safe rollout." },
      { tier: "advanced", title: "Advanced", description: "Tool comparison, automation habits, and confidence-building projects." }
    ],
    tiers: {
      starter: {
        tab: "Starter",
        label: "Level 1: foundations",
        modules: [
          {
            title: "What is AI?",
            summary: "AI is software that can work with language, images, numbers, and patterns. It is useful when you give it clear instructions and check its work.",
            learn: "Think of AI as a fast assistant, not a perfect expert. It can draft, summarize, translate, compare options, explain confusing topics, and create first versions of documents.",
            practice: "Ask AI to turn a messy note into a polite message, a checklist, or a short report. Start with low-risk tasks where you can easily review the answer.",
            local: "For a Vietnamese office team, AI can rewrite a customer reply in warmer language, translate it into English, then create a simple follow-up checklist.",
            prompt: "I work in retail and need to reply to a customer who received a late delivery. Write a polite Vietnamese message, keep it under 120 words, and include one apology plus one next step."
          },
          {
            title: "Prompting basics",
            summary: "A good prompt gives the task, background, format, tone, and success criteria.",
            learn: "Weak prompt: 'Help with my report.' Strong prompt: 'Summarize these sales notes into 5 bullet points for my manager, using simple language and highlighting risks.'",
            practice: "Use this pattern: role, task, context, output format, constraints. The more specific your workplace situation is, the more useful the answer becomes.",
            local: "A logistics coordinator can ask AI to compare delayed shipments, draft a customer update, and list which orders need a phone call today.",
            prompt: "Act as a careful operations assistant. Turn these weekly notes into a short manager update with 3 wins, 3 risks, and 3 next actions. Use simple business English."
          },
          {
            title: "Safety and trust",
            summary: "AI is powerful, but it can be wrong. People still own judgment, privacy, and final decisions.",
            learn: "Do not paste confidential customer data, salary information, passwords, private contracts, or personal identity numbers into tools unless your company has approved that tool.",
            practice: "Before using AI output, check facts, numbers, names, dates, and anything that affects customers, money, health, legal topics, or company reputation.",
            local: "If you work with supplier prices or customer phone numbers, remove names and private details before asking AI to summarize trends.",
            prompt: "Review this draft announcement for clarity and risk. Flag any claims that need fact-checking, and suggest a safer version in plain language."
          }
        ]
      },
      workflows: {
        tab: "Workflows",
        label: "Level 2: daily workflows",
        modules: [
          {
            title: "Email and chat faster",
            summary: "Use AI to draft, shorten, translate, and adjust tone for workplace messages.",
            learn: "AI can help you move from rough thoughts to clear communication. You stay responsible for the relationship and the facts.",
            practice: "Paste a non-confidential draft and ask for three versions: friendly, direct, and formal.",
            local: "A hotel supervisor can turn guest feedback into a kind apology, a team note, and a manager summary.",
            prompt: "Rewrite this message for a busy supplier. Make it respectful, direct, and easy to answer. End with two clear options."
          },
          {
            title: "Reports from messy notes",
            summary: "Transform meeting notes, customer comments, and field updates into useful summaries.",
            learn: "AI is especially helpful when information is scattered. Ask it to group, label, and prioritize.",
            practice: "Give AI a structure before it writes: summary, risks, decisions, questions, next actions.",
            local: "A factory line lead can summarize defect notes by product, shift, likely cause, and next action.",
            prompt: "Organize these notes into a table with columns for issue, impact, owner, urgency, and next step."
          },
          {
            title: "Spreadsheets and simple numbers",
            summary: "Use AI to explain formulas, clean up data, and turn numbers into plain-language summaries.",
            learn: "You do not need to be an Excel expert. Describe what you want in normal words, and AI can suggest the formula, explain an error, or summarize what a table of numbers actually means.",
            practice: "Paste a small, non-confidential table and ask AI: what stands out, what looks wrong, and what one chart would show this best?",
            local: "A shop owner in Da Nang can paste weekly sales by product and ask which items are growing, which are slowing, and what to reorder first.",
            prompt: "Here is a small table of monthly sales by product. Explain the three most important patterns in simple language, then suggest one formula I can use to track this automatically."
          }
        ]
      },
      team: {
        tab: "Team",
        label: "Level 3: team adoption",
        modules: [
          {
            title: "AI for managers",
            summary: "Managers can use AI to prepare coaching, planning, performance conversations, and training material.",
            learn: "AI can help managers think through options before speaking with people. It should support empathy, not replace it.",
            practice: "Ask AI for a conversation plan, then edit it to match your team culture.",
            local: "A bank branch manager can prepare a short coaching guide for staff learning a new customer intake process.",
            prompt: "Create a 15-minute coaching plan for a team member who is good with customers but late with reports. Keep the tone respectful."
          },
          {
            title: "Shared prompt library",
            summary: "Teams improve faster when they save prompts that work and adapt them by role.",
            learn: "A shared prompt should include when to use it, what information to remove, and how to check the output.",
            practice: "Create one reusable prompt for a recurring task in your department.",
            local: "A sales team can keep approved prompts for customer follow-ups, quote explanations, and weekly pipeline summaries.",
            prompt: "Create a reusable prompt template for my team to summarize customer calls. Include placeholders and a privacy reminder."
          },
          {
            title: "Rolling out AI safely",
            summary: "Introduce AI to a whole department with clear rules, approved tools, and a simple training rhythm.",
            learn: "Adoption fails when rules are unclear. A good rollout names which tools are approved, what data must never be pasted, who to ask when unsure, and how wins get shared with the team.",
            practice: "Draft a one-page AI usage guide for your team: three allowed uses, three forbidden ones, and one weekly habit for sharing what worked.",
            local: "A hotel group in Ho Chi Minh City can pilot AI with the front desk team for two weeks, collect the best prompts, then train housekeeping and sales with real examples.",
            prompt: "Write a one-page AI usage policy for a small customer service team. Use simple language, include allowed and forbidden examples, and end with three questions staff can ask their manager."
          }
        ]
      },
      advanced: {
        tab: "Advanced",
        label: "Level 4: advanced confidence",
        modules: [
          {
            title: "Compare AI tools",
            summary: "Learn when to use chatbots, office copilots, image tools, translation tools, and automation tools.",
            learn: "Different tools are good at different jobs. Choose based on privacy, company approval, output type, and ease of checking.",
            practice: "Match the tool to the task: writing, spreadsheet analysis, presentation, image, translation, search, or automation.",
            local: "A tourism company may use one tool for guest replies, one for presentation drafts, and one approved internal tool for booking data.",
            prompt: "Help me choose the safest AI tool category for these five tasks. Explain the privacy risk and how to verify each output."
          },
          {
            title: "Personal productivity system",
            summary: "Build repeatable AI habits for planning, learning, meetings, decisions, and follow-up.",
            learn: "The biggest benefit comes from small daily routines, not one dramatic tool. Use AI to start faster, think clearer, and finish cleaner.",
            practice: "Create a daily 10-minute AI routine for your role.",
            local: "A department head can use AI each morning to prioritize messages, prepare meeting questions, and draft the day's follow-ups.",
            prompt: "Design a daily AI routine for my role. Include morning planning, communication, learning, and end-of-day review."
          },
          {
            title: "Multi-step workflows",
            summary: "Chain simple AI steps together: collect input, process it, verify the result, then act.",
            learn: "Big tasks become manageable when you split them into steps and give AI one step at a time: first organize the raw information, then draft, then critique the draft, then produce the final version. You stay the checkpoint between steps.",
            practice: "Pick one monthly task and write down its four steps. Run each step as its own prompt, and note where a human check is required before continuing.",
            local: "A logistics coordinator can turn month-end reporting into four prompts: group the delivery data, summarize problems, draft the customer letter, then check the letter against company policy.",
            prompt: "I will give you a task in four steps: organize these notes, summarize the risks, draft a short report, then list what a human should verify before sending. Start with step one and wait for my confirmation between steps."
          }
        ]
      }
    }
  },
  vi: {
    nav: ["Tổng quan", "Khóa học", "Hồ sơ", "Cấp học"],
    brandSubtitle: "Đào tạo AI cho người đi làm",
    builtBy: "Được xây dựng bởi",
    overviewEyebrow: "Học cách dùng AI và tối ưu hóa AI trong công việc, cuộc sống hằng ngày",
    overviewTitle: "Học cách dùng AI ở nơi làm việc và ở nhà, kể cả khi bạn bắt đầu từ con số 0.",
    overviewBody:
      "Everday AI là nền tảng khóa học linh hoạt, được hỗ trợ bởi trí tuệ nhân tạo, dành cho người đi làm không chuyên về công nghệ nhưng muốn hiểu và sử dụng các công cụ AI một cách có trách nhiệm. Nền tảng giúp bạn hiểu AI có thể làm gì, cách viết prompt rõ ràng, cách áp dụng AI vào công việc và cuộc sống hằng ngày, cũng như cách tránh các lỗi thường gặp về quyền riêng tư và độ chính xác. Bạn càng cung cấp thông tin cụ thể về vai trò, ngành nghề, công ty và trách nhiệm hằng ngày, khóa học càng có thể cá nhân hóa ví dụ, prompt và bài thực hành để phù hợp hơn với nhu cầu thực tế của bạn.",
    profileEyebrow: "Lộ trình cá nhân",
    profileTitle: "Cho chúng tôi biết về công việc của bạn",
    currentPath: "Lộ trình hiện tại",
    defaultPathTitle: "Nền tảng AI cho công việc hằng ngày",
    defaultPathSubtitle: "Hãy cá nhân hóa khóa học để các ví dụ phù hợp hơn với công việc của bạn.",
    examplesFocus: "Ví dụ sẽ tập trung vào",
    learnerSuffix: "học viên",
    labels: {
      age: "Tuổi",
      gender: "Giới tính",
      industry: "Ngành",
      customIndustry: "Mô tả ngành của bạn",
      role: "Vai trò",
      company: "Công ty",
      experience: "Kinh nghiệm"
    },
    placeholders: {
      age: "42",
      role: "Quản lý vận hành",
      customIndustry: "Năng lượng tái tạo, pháp lý, làm đẹp, nông nghiệp...",
      company: "Dán website công ty hoặc mô tả công ty đang làm gì.",
      experience: "Tôi quản lý một nhóm nhỏ và chuẩn bị báo cáo hằng tuần.",
      prompt: "Hãy yêu cầu AI hỗ trợ một việc thật trong công việc của bạn."
    },
    genderOptions: [
      ["", "Không muốn trả lời"],
      ["Female", "Nữ"],
      ["Male", "Nam"],
      ["Non-binary", "Phi nhị nguyên"],
      ["Prefer to self-describe", "Muốn tự mô tả"]
    ],
    personalize: "Cá nhân hóa khóa học",
    freeTier: "Miễn phí cho mọi học viên",
    courseTitle: "Bắt đầu từ con số 0, thực hành với công việc thật",
    courseDescription: "Everday AI hoạt động như sự kết hợp giữa trợ lý huấn luyện AI và nền tảng đào tạo: nền tảng dạy khái niệm, sau đó hướng dẫn bạn thực hành cho đến khi bạn có thể dùng AI một cách tự tin và thành thạo trong công việc hằng ngày.",
    progressLabel: "Tiến độ khóa học",
    lesson: "Bài",
    durationLabel: "Thời lượng",
    difficultyLabel: "Độ khó",
    capabilityLabel: "Năng lực AI",
    readingEyebrow: "Bài đọc và ví dụ",
    readingTitle: "Nội dung cần xem lại",
    quizEyebrow: "Kiểm tra kiến thức",
    quizTitle: "Câu hỏi củng cố",
    durationFree: "30 phút",
    durationPaid: "Khoảng 1 giờ",
    difficulties: {
      starter: "Nền tảng",
      workflows: "Ứng dụng trong công việc",
      team: "Năng lực cho quản lý và đội ngũ",
      advanced: "Tự tin về mặt kỹ thuật"
    },
    blocks: {
      learn: "Học",
      practice: "Thử trong công việc",
      local: "Ví dụ thực tế"
    },
    fluencyCoach: "Huấn luyện viên AI",
    fluencyTitle: "Xây dựng sự thành thạo AI thực tế",
    coachNoteLabel: "Gợi ý huấn luyện",
    coachDrillLabel: "Bài luyện tập",
    coachStandardLabel: "Tiêu chuẩn thành thạo",
    coachNote: "Mục tiêu của bạn không chỉ là biết AI là gì. Mục tiêu là biết khi nào nên dùng AI, cách đặt yêu cầu rõ ràng, cách phản biện kết quả và cách biến câu trả lời thành công việc tốt hơn.",
    coachDrill: "Hãy yêu cầu AI đưa ra một câu trả lời, một phương án thay thế và một phần tự phê bình. Sau đó so sánh cả ba và quyết định bạn thật sự sẽ dùng phần nào.",
    coachStandard: "Người dùng thành thạo có thể xác định vấn đề, cung cấp bối cảnh, yêu cầu định dạng hữu ích, kiểm tra giả định và cải thiện kết quả qua hai hoặc ba lượt trao đổi.",
    promptCoach: "Hướng dẫn prompt",
    promptTitle: "Viết yêu cầu tốt hơn",
    useExample: "Dùng ví dụ",
    checkPrompt: "Kiểm tra prompt",
    coachDefault: "Một prompt tốt nên có nhiệm vụ, bối cảnh, định dạng kết quả và tiêu chuẩn thành công.",
    promptGood:
      "Đây là một prompt tốt cho công việc. Prompt có nhiệm vụ, bối cảnh, định dạng kết quả và tiêu chuẩn chất lượng. Bước tiếp theo: hãy xóa thông tin riêng tư trước khi dùng với công cụ thật.",
    promptImprove: "Khởi đầu tốt. Hãy thêm chi tiết về",
    promptStrongInclude: "Prompt tốt thường có",
    promptAndTarget: "và tiêu chuẩn thành công rõ ràng.",
    packageEyebrow: "Lộ trình học",
    packageTitle: "Bốn cấp học, hoàn toàn miễn phí",
    packageDescription: "Học theo tốc độ của riêng bạn. Mỗi cấp xây dựng trên cấp trước.",
    openTier: "Mở cấp học",
    levelLabel: "Cấp",
    currentLevel: "Bạn đang ở đây",
    account: {
      eyebrow: "Tài khoản của bạn",
      title: "Lưu tiến độ học",
      email: "Email",
      password: "Mật khẩu",
      signUp: "Tạo tài khoản",
      logIn: "Đăng nhập",
      logOut: "Đăng xuất",
      signedOut: "Tạo tài khoản miễn phí để giữ tiến độ và các cấp học đã mở trên mọi thiết bị.",
      signedInAs: "Đang đăng nhập với",
      checkEmail: "Đã tạo tài khoản. Hãy mở email xác nhận chúng tôi vừa gửi, bấm vào liên kết bên trong, rồi quay lại đăng nhập.",
      authFailed: "Chưa đăng nhập được. Hãy kiểm tra email và mật khẩu rồi thử lại.",
      fillBoth: "Hãy nhập email và mật khẩu có ít nhất 8 ký tự.",
      notConfigured: "Tài khoản trực tuyến sẽ sớm ra mắt. Hiện tại, tiến độ của bạn được lưu trên thiết bị này.",
      loggedOut: "Bạn đã đăng xuất. Tiến độ vẫn được lưu trong tài khoản của bạn."
    },
    promptChecks: {
      task: "nhiệm vụ",
      context: "bối cảnh",
      format: "định dạng",
      quality: "tiêu chuẩn chất lượng"
    },
    industries: {
      "Retail and sales": "Bán lẻ và bán hàng",
      Manufacturing: "Sản xuất",
      "Hospitality and tourism": "Khách sạn và du lịch",
      "Banking and finance": "Ngân hàng và tài chính",
      Healthcare: "Y tế",
      Education: "Giáo dục",
      Logistics: "Hậu cần",
      "Government services": "Dịch vụ công",
      "Small business": "Doanh nghiệp nhỏ",
      Other: "Khác"
    },
    industryExamples: {
      "Retail and sales": "trả lời khách hàng, mô tả sản phẩm, tóm tắt doanh số hằng ngày và tin nhắn chăm sóc",
      Manufacturing: "bàn giao ca, tổng hợp lỗi sản phẩm, nhắc nhở an toàn và cập nhật nhà cung cấp",
      "Hospitality and tourism": "tin nhắn cho khách, giải thích đặt phòng, trả lời đánh giá và thông báo cho nhân viên",
      "Banking and finance": "giải thích quy định, tóm tắt khách hàng, danh sách rủi ro và cập nhật nội bộ",
      Healthcare: "giải thích dễ hiểu cho bệnh nhân, hướng dẫn lịch hẹn, ghi chú nhóm và tóm tắt hành chính",
      Education: "dàn ý bài học, tin nhắn cho phụ huynh, nhận xét học viên và câu hỏi kiểm tra",
      Logistics: "cập nhật giao hàng, giải thích chậm trễ, ghi chú tuyến đường và danh sách ưu tiên",
      "Government services": "hướng dẫn cho người dân, giải thích biểu mẫu, kịch bản dịch vụ và thông báo công khai",
      "Small business": "bài đăng marketing, trả lời khách hàng, hóa đơn và checklist vận hành",
      Other: "công việc cụ thể, ưu tiên của công ty, nhiệm vụ lặp lại và quyết định hằng ngày"
    },
    packages: [
      { tier: "starter", title: "Khởi đầu", description: "Nền tảng AI, những prompt đầu tiên, quyền riêng tư và cách dùng an toàn." },
      { tier: "workflows", title: "Quy trình hằng ngày", description: "Email, báo cáo, dịch thuật, bảng tính và quy trình văn phòng hằng ngày." },
      { tier: "team", title: "Đội ngũ", description: "Hướng dẫn cho quản lý, thư viện prompt của đội ngũ và triển khai an toàn." },
      { tier: "advanced", title: "Nâng cao", description: "So sánh công cụ, thói quen tự động hóa và dự án tăng sự tự tin." }
    ],
    tiers: {
      starter: {
        tab: "Khởi đầu",
        label: "Cấp 1: nền tảng",
        modules: [
          {
            title: "AI là gì?",
            summary: "AI là phần mềm có thể làm việc với ngôn ngữ, hình ảnh, số liệu và các mẫu thông tin. AI hữu ích nhất khi bạn đưa yêu cầu rõ ràng và kiểm tra lại kết quả.",
            learn: "Hãy xem AI như một trợ lý nhanh, không phải một chuyên gia hoàn hảo. AI có thể viết bản nháp, tóm tắt, dịch, so sánh lựa chọn, giải thích chủ đề khó hiểu và tạo phiên bản đầu tiên của tài liệu.",
            practice: "Hãy nhờ AI biến ghi chú rời rạc thành email lịch sự, checklist hoặc báo cáo ngắn. Bắt đầu với việc ít rủi ro mà bạn có thể kiểm tra dễ dàng.",
            local: "Với một đội ngũ văn phòng ở Việt Nam, AI có thể viết lại tin nhắn trả lời khách hàng, dịch sang tiếng Anh, rồi tạo checklist theo dõi.",
            prompt: "Tôi làm trong ngành bán lẻ và cần trả lời một khách hàng bị giao hàng trễ. Hãy viết một tin nhắn tiếng Việt lịch sự, dưới 120 từ, có một lời xin lỗi và một bước tiếp theo."
          },
          {
            title: "Cơ bản về prompt",
            summary: "Prompt tốt cần có nhiệm vụ, bối cảnh, định dạng, giọng văn và tiêu chuẩn thành công.",
            learn: "Prompt yếu: 'Giúp tôi làm báo cáo.' Prompt tốt: 'Tóm tắt ghi chú bán hàng này thành 5 gạch đầu dòng cho quản lý, dùng ngôn ngữ đơn giản và nêu rõ rủi ro.'",
            practice: "Dùng công thức: vai trò, nhiệm vụ, bối cảnh, định dạng kết quả và giới hạn. Bối cảnh công việc càng rõ thì kết quả càng hữu ích.",
            local: "Một điều phối viên logistics có thể nhờ AI so sánh các đơn hàng trễ, soạn cập nhật cho khách và liệt kê đơn cần gọi điện trong hôm nay.",
            prompt: "Đóng vai một trợ lý vận hành cẩn thận. Hãy biến ghi chú hằng tuần này thành bản cập nhật ngắn cho quản lý với 3 điểm tốt, 3 rủi ro và 3 hành động tiếp theo. Dùng tiếng Anh kinh doanh đơn giản."
          },
          {
            title: "An toàn và độ tin cậy",
            summary: "AI rất mạnh, nhưng có thể sai. Con người vẫn chịu trách nhiệm về phán đoán, quyền riêng tư và quyết định cuối cùng.",
            learn: "Không đưa dữ liệu khách hàng, lương, mật khẩu, hợp đồng riêng hoặc số định danh cá nhân vào công cụ AI nếu công ty chưa phê duyệt.",
            practice: "Trước khi dùng kết quả AI, hãy kiểm tra sự thật, số liệu, tên, ngày tháng và bất cứ nội dung nào ảnh hưởng đến khách hàng, tiền bạc, y tế, pháp lý hoặc uy tín công ty.",
            local: "Nếu bạn làm việc với giá nhà cung cấp hoặc số điện thoại khách hàng, hãy xóa tên và thông tin riêng tư trước khi nhờ AI tóm tắt xu hướng.",
            prompt: "Hãy xem bản nháp thông báo này về độ rõ ràng và rủi ro. Chỉ ra thông tin cần kiểm chứng và đề xuất phiên bản an toàn hơn bằng ngôn ngữ đơn giản."
          }
        ]
      },
      workflows: {
        tab: "Quy trình",
        label: "Cấp 2: quy trình hằng ngày",
        modules: [
          {
            title: "Email và chat nhanh hơn",
            summary: "Dùng AI để viết nháp, rút gọn, dịch và điều chỉnh giọng văn cho tin nhắn công việc.",
            learn: "AI giúp bạn biến ý tưởng rời rạc thành giao tiếp rõ ràng. Bạn vẫn chịu trách nhiệm về mối quan hệ và độ chính xác.",
            practice: "Đưa một bản nháp không có thông tin mật và yêu cầu ba phiên bản: thân thiện, trực tiếp và trang trọng.",
            local: "Một giám sát khách sạn có thể biến phản hồi của khách thành lời xin lỗi, ghi chú cho đội ngũ và bản tóm tắt cho quản lý.",
            prompt: "Viết lại tin nhắn này cho một nhà cung cấp bận rộn. Hãy lịch sự, trực tiếp, dễ trả lời và kết thúc bằng hai lựa chọn rõ ràng."
          },
          {
            title: "Báo cáo từ ghi chú rời rạc",
            summary: "Biến ghi chú họp, bình luận khách hàng và cập nhật hiện trường thành bản tóm tắt hữu ích.",
            learn: "AI đặc biệt hữu ích khi thông tin nằm rải rác. Hãy yêu cầu AI nhóm, đặt nhãn và ưu tiên thông tin.",
            practice: "Cho AI cấu trúc trước khi viết: tóm tắt, rủi ro, quyết định, câu hỏi và hành động tiếp theo.",
            local: "Một trưởng ca nhà máy có thể tóm tắt lỗi sản phẩm theo sản phẩm, ca làm, nguyên nhân có khả năng và hành động tiếp theo.",
            prompt: "Sắp xếp các ghi chú này thành bảng với các cột: vấn đề, tác động, người phụ trách, mức độ khẩn cấp và bước tiếp theo."
          },
          {
            title: "Bảng tính và số liệu đơn giản",
            summary: "Dùng AI để giải thích công thức, làm sạch dữ liệu và biến số liệu thành bản tóm tắt dễ hiểu.",
            learn: "Bạn không cần phải là chuyên gia Excel. Hãy mô tả điều bạn muốn bằng lời bình thường, AI có thể gợi ý công thức, giải thích lỗi hoặc tóm tắt ý nghĩa thật sự của một bảng số liệu.",
            practice: "Dán một bảng nhỏ không chứa thông tin mật và hỏi AI: điều gì nổi bật, điều gì có vẻ sai và một biểu đồ nào sẽ thể hiện rõ nhất?",
            local: "Một chủ cửa hàng ở Đà Nẵng có thể dán doanh số hằng tuần theo sản phẩm và hỏi mặt hàng nào đang tăng, mặt hàng nào chậm lại và nên nhập lại hàng nào trước.",
            prompt: "Đây là bảng doanh số hằng tháng theo sản phẩm. Hãy giải thích ba điểm quan trọng nhất bằng ngôn ngữ đơn giản, sau đó gợi ý một công thức để tôi theo dõi tự động."
          }
        ]
      },
      team: {
        tab: "Đội ngũ",
        label: "Cấp 3: áp dụng trong đội ngũ",
        modules: [
          {
            title: "AI cho quản lý",
            summary: "Quản lý có thể dùng AI để chuẩn bị huấn luyện, lập kế hoạch, trao đổi về hiệu suất và tài liệu đào tạo.",
            learn: "AI có thể giúp quản lý suy nghĩ qua các lựa chọn trước khi nói chuyện với nhân viên. AI nên hỗ trợ sự đồng cảm, không thay thế sự đồng cảm.",
            practice: "Hãy nhờ AI tạo kế hoạch trao đổi, sau đó chỉnh sửa để phù hợp với văn hóa đội ngũ.",
            local: "Một quản lý chi nhánh ngân hàng có thể chuẩn bị hướng dẫn 15 phút cho nhân viên học quy trình tiếp nhận khách hàng mới.",
            prompt: "Tạo kế hoạch huấn luyện 15 phút cho một nhân viên chăm sóc khách hàng tốt nhưng nộp báo cáo trễ. Giữ giọng văn tôn trọng."
          },
          {
            title: "Thư viện prompt dùng chung",
            summary: "Đội ngũ tiến bộ nhanh hơn khi lưu các prompt hiệu quả và điều chỉnh theo từng vai trò.",
            learn: "Prompt dùng chung nên ghi rõ khi nào dùng, thông tin nào cần xóa và cách kiểm tra kết quả.",
            practice: "Tạo một mẫu prompt có thể dùng lại cho một việc lặp lại trong phòng ban.",
            local: "Đội bán hàng có thể lưu prompt đã phê duyệt cho chăm sóc khách hàng, giải thích báo giá và tóm tắt pipeline hằng tuần.",
            prompt: "Tạo mẫu prompt dùng lại cho đội ngũ của tôi để tóm tắt cuộc gọi khách hàng. Bao gồm chỗ trống cần điền và nhắc nhở về quyền riêng tư."
          },
          {
            title: "Triển khai AI an toàn",
            summary: "Đưa AI vào cả phòng ban với quy tắc rõ ràng, công cụ đã phê duyệt và nhịp đào tạo đơn giản.",
            learn: "Việc áp dụng thất bại khi quy tắc không rõ. Một kế hoạch triển khai tốt nêu rõ công cụ nào được phê duyệt, dữ liệu nào tuyệt đối không được dán vào, hỏi ai khi chưa chắc chắn và cách chia sẻ thành công với đội ngũ.",
            practice: "Soạn hướng dẫn sử dụng AI một trang cho đội của bạn: ba việc được phép, ba việc bị cấm và một thói quen hằng tuần để chia sẻ điều hiệu quả.",
            local: "Một chuỗi khách sạn ở TP. Hồ Chí Minh có thể thử nghiệm AI với đội lễ tân trong hai tuần, thu thập các prompt tốt nhất, rồi đào tạo bộ phận buồng phòng và kinh doanh bằng ví dụ thật.",
            prompt: "Viết chính sách sử dụng AI một trang cho một đội chăm sóc khách hàng nhỏ. Dùng ngôn ngữ đơn giản, có ví dụ được phép và bị cấm, kết thúc bằng ba câu hỏi nhân viên có thể hỏi quản lý."
          }
        ]
      },
      advanced: {
        tab: "Nâng cao",
        label: "Cấp 4: tự tin nâng cao",
        modules: [
          {
            title: "So sánh công cụ AI",
            summary: "Học khi nào nên dùng chatbot, copilot văn phòng, công cụ hình ảnh, công cụ dịch và công cụ tự động hóa.",
            learn: "Mỗi công cụ phù hợp với một loại việc khác nhau. Hãy chọn dựa trên quyền riêng tư, phê duyệt của công ty, dạng kết quả và khả năng kiểm tra.",
            practice: "Ghép công cụ với nhiệm vụ: viết, phân tích bảng tính, thuyết trình, hình ảnh, dịch, tìm kiếm hoặc tự động hóa.",
            local: "Một công ty du lịch có thể dùng một công cụ cho tin nhắn khách, một công cụ cho bản nháp thuyết trình và một công cụ nội bộ đã phê duyệt cho dữ liệu đặt phòng.",
            prompt: "Giúp tôi chọn loại công cụ AI an toàn nhất cho năm việc này. Giải thích rủi ro về quyền riêng tư và cách kiểm tra kết quả."
          },
          {
            title: "Hệ thống năng suất cá nhân",
            summary: "Xây dựng thói quen AI lặp lại cho lập kế hoạch, học tập, họp, quyết định và theo dõi.",
            learn: "Lợi ích lớn nhất đến từ các thói quen nhỏ hằng ngày, không phải một công cụ thật hoành tráng. Dùng AI để bắt đầu nhanh hơn, suy nghĩ rõ hơn và hoàn thiện gọn hơn.",
            practice: "Tạo thói quen AI 10 phút mỗi ngày cho vai trò của bạn.",
            local: "Một trưởng bộ phận có thể dùng AI mỗi sáng để ưu tiên tin nhắn, chuẩn bị câu hỏi họp và soạn việc theo dõi trong ngày.",
            prompt: "Thiết kế thói quen AI hằng ngày cho vai trò của tôi. Bao gồm lập kế hoạch buổi sáng, giao tiếp, học tập và tổng kết cuối ngày."
          },
          {
            title: "Quy trình nhiều bước",
            summary: "Nối các bước AI đơn giản lại với nhau: thu thập dữ liệu, xử lý, kiểm tra kết quả, rồi hành động.",
            learn: "Việc lớn trở nên dễ quản lý khi bạn chia thành từng bước và giao cho AI mỗi lần một bước: sắp xếp thông tin thô trước, rồi viết nháp, rồi phản biện bản nháp, cuối cùng tạo phiên bản hoàn chỉnh. Bạn là điểm kiểm soát giữa các bước.",
            practice: "Chọn một việc hằng tháng và viết ra bốn bước của nó. Chạy từng bước bằng một prompt riêng, và ghi lại chỗ nào cần con người kiểm tra trước khi tiếp tục.",
            local: "Một điều phối viên logistics có thể biến báo cáo cuối tháng thành bốn prompt: nhóm dữ liệu giao hàng, tóm tắt vấn đề, soạn thư gửi khách, rồi đối chiếu thư với chính sách công ty.",
            prompt: "Tôi sẽ giao cho bạn một nhiệm vụ gồm bốn bước: sắp xếp các ghi chú này, tóm tắt rủi ro, soạn báo cáo ngắn, rồi liệt kê những gì con người cần kiểm tra trước khi gửi. Hãy bắt đầu bước một và chờ tôi xác nhận giữa các bước."
          }
        ]
      }
    }
  }
};

let state = {
  language: "en",
  tier: "starter",
  moduleIndex: 0,
  viewed: {},
  profile: {
    industry: "Retail and sales",
    customIndustry: "",
    role: "",
    company: "",
    experience: ""
  }
};

const saved = localStorage.getItem("everydayAiSkillsState");
if (saved) {
  state = { ...state, ...JSON.parse(saved) };
  if (!tierOrder.includes(state.tier)) {
    state.tier = "starter";
    state.moduleIndex = 0;
  }
  if (!state.viewed || typeof state.viewed !== "object" || Array.isArray(state.viewed)) {
    state.viewed = {};
  }
}

const moduleList = document.querySelector("#moduleList");
const packageList = document.querySelector("#packageList");
const tabs = document.querySelectorAll(".tab");
const siteTabs = document.querySelectorAll(".site-tab");
const languageOptions = document.querySelectorAll(".language-option");
const form = document.querySelector("#profileForm");
const customIndustryField = document.querySelector("#customIndustryField");
const promptInput = document.querySelector("#promptInput");
const authForm = document.querySelector("#authForm");
const authEmailInput = document.querySelector("#authEmail");
const authPasswordInput = document.querySelector("#authPassword");
const authStatus = document.querySelector("#authStatus");
const signUpButton = document.querySelector("#signUpButton");
const logOutButton = document.querySelector("#logOutButton");

function copy() {
  return content[state.language] || content.en;
}

function saveState() {
  localStorage.setItem("everydayAiSkillsState", JSON.stringify(state));
}

function markViewed() {
  state.viewed[`${state.tier}:${state.moduleIndex}`] = true;
}

function profileColumns() {
  return {
    age: state.profile.age ? Number(state.profile.age) : null,
    gender: state.profile.gender || null,
    industry: state.profile.industry || null,
    custom_industry: state.profile.customIndustry || null,
    role: state.profile.role || null,
    company: state.profile.company || null,
    experience: state.profile.experience || null,
    language: state.language,
    current_tier: state.tier,
    current_module_index: state.moduleIndex,
    viewed_modules: state.viewed
  };
}

// Fire-and-forget write-through: localStorage stays the instant cache, the
// account row is the cross-device source of truth.
function pushProfile() {
  if (!sb || !currentUser) {
    return;
  }
  sb.from("profiles")
    .update(profileColumns())
    .eq("id", currentUser.id)
    .then(({ error }) => {
      if (error) {
        console.warn("Profile sync failed:", error.message);
      }
    });
}

function applyRemoteProfile(row) {
  const remoteHasProfile = row.role || row.industry || row.experience || row.company;
  if (remoteHasProfile) {
    state.profile = {
      age: row.age ? String(row.age) : "",
      gender: row.gender || "",
      industry: row.industry || state.profile.industry,
      customIndustry: row.custom_industry || "",
      role: row.role || "",
      company: row.company || "",
      experience: row.experience || ""
    };
    state.language = row.language === "vi" ? "vi" : "en";
    state.moduleIndex = row.current_module_index || 0;
    state.tier = tierOrder.includes(row.current_tier) ? row.current_tier : "starter";
    state.viewed = row.viewed_modules && typeof row.viewed_modules === "object"
      ? row.viewed_modules
      : {};
  } else {
    // Fresh account: keep what the learner already entered on this device
    // and push it up instead of wiping it with an empty row.
    pushProfile();
  }
}

async function loadRemoteProfile() {
  if (!sb || !currentUser) {
    return;
  }
  const { data, error } = await sb
    .from("profiles")
    .select("*")
    .eq("id", currentUser.id)
    .maybeSingle();
  if (error) {
    console.warn("Profile load failed:", error.message);
    return;
  }
  let row = data;
  if (!row) {
    const inserted = await sb
      .from("profiles")
      .insert({ id: currentUser.id, ...profileColumns() })
      .select()
      .single();
    if (inserted.error) {
      console.warn("Profile create failed:", inserted.error.message);
      return;
    }
    row = inserted.data;
  }
  applyRemoteProfile(row);
  saveState();
  render();
  resetContextMessages();
}

function renderAuth() {
  const c = copy();
  const a = c.account;
  document.querySelector("#authEyebrow").textContent = a.eyebrow;
  document.querySelector("#authTitle").textContent = a.title;
  document.querySelector("#authEmailLabel").textContent = a.email;
  document.querySelector("#authPasswordLabel").textContent = a.password;
  signUpButton.textContent = a.signUp;
  document.querySelector("#logInButton").textContent = a.logIn;
  logOutButton.textContent = a.logOut;

  if (!sb) {
    authStatus.textContent = a.notConfigured;
    authForm.classList.add("hidden");
    logOutButton.classList.add("hidden");
    return;
  }

  if (currentUser) {
    authStatus.textContent = `${a.signedInAs} ${currentUser.email}.`;
    authForm.classList.add("hidden");
    logOutButton.classList.remove("hidden");
  } else {
    if (!authStatus.dataset.notice) {
      authStatus.textContent = a.signedOut;
    }
    authForm.classList.remove("hidden");
    logOutButton.classList.add("hidden");
  }
}

function setAuthNotice(message, isError) {
  authStatus.textContent = message;
  authStatus.dataset.notice = "true";
  authStatus.classList.toggle("auth-error", Boolean(isError));
}

function clearAuthNotice() {
  delete authStatus.dataset.notice;
  authStatus.classList.remove("auth-error");
}

function currentModule() {
  const c = copy();
  return c.tiers[state.tier].modules[state.moduleIndex] || c.tiers[state.tier].modules[0];
}

function modulePlan() {
  const vi = state.language === "vi";
  const starter = {
    duration: copy().durationFree,
    difficulty: copy().difficulties.starter,
    capabilities: vi
      ? "Viết, tóm tắt, dịch, đặt câu hỏi, kiểm tra cơ bản"
      : "Writing, summarizing, translating, asking questions, basic checking",
    readings: vi
      ? [
          "AI tạo sinh là gì và khác gì với công cụ tìm kiếm truyền thống.",
          "Prompt tốt gồm nhiệm vụ, bối cảnh, định dạng và tiêu chuẩn chất lượng.",
          "Những thông tin không nên đưa vào công cụ AI khi chưa được công ty cho phép.",
          "Vì sao AI có thể trả lời sai một cách tự tin và cách kiểm tra nhanh câu trả lời."
        ]
      : [
          "What generative AI is and how it differs from traditional search.",
          "Why strong prompts include task, context, format, and quality criteria.",
          "Which private or company details should stay out of unapproved AI tools.",
          "Why AI can be confidently wrong, and quick ways to check an answer."
        ],
    quiz: vi
      ? [
          "AI nên được xem là trợ lý, công cụ tìm kiếm, hay người ra quyết định cuối cùng?",
          "Prompt của bạn đã nêu rõ kết quả mong muốn chưa?",
          "Bạn sẽ kiểm tra lại phần nào trước khi dùng câu trả lời của AI?",
          "Hãy kể một việc trong tuần này bạn có thể thử giao cho AI với rủi ro thấp."
        ]
      : [
          "Should AI be treated as an assistant, a search box, or the final decision-maker?",
          "Does your prompt state the output you want clearly?",
          "What would you verify before using the AI answer?",
          "Name one low-risk task from this week you could try handing to AI."
        ]
  };

  const plans = {
    starter,
    workflows: {
      duration: copy().durationPaid,
      difficulty: copy().difficulties.workflows,
      capabilities: vi
        ? "Email, báo cáo, nghiên cứu, bảng tính, thuyết trình, dịch thuật"
        : "Email, reports, research, spreadsheets, presentations, translation",
      readings: vi
        ? [
            "Cách biến ghi chú rời rạc thành báo cáo có cấu trúc.",
            "Cách dùng AI để soạn email, điều chỉnh giọng văn và dịch nội dung.",
            "Cách nhờ AI hỗ trợ bảng tính, phân tích dữ liệu nhẹ và bản nháp thuyết trình.",
            "Cách yêu cầu AI giải thích số liệu bằng ngôn ngữ đơn giản trước khi báo cáo."
          ]
        : [
            "How to turn messy notes into structured reports.",
            "How to use AI for email drafting, tone control, and translation.",
            "How AI can support spreadsheets, light data analysis, and presentation drafts.",
            "How to ask AI to explain numbers in plain language before you report them."
          ],
      quiz: vi
        ? [
            "Khi nào bạn nên yêu cầu AI trả lời bằng bảng thay vì đoạn văn?",
            "Bạn sẽ yêu cầu AI kiểm tra giả định trong báo cáo như thế nào?",
            "Hãy viết một prompt yêu cầu AI tạo bản nháp email và phiên bản ngắn hơn.",
            "Trước khi tin một con số AI đưa ra, bạn sẽ đối chiếu với nguồn nào?"
          ]
        : [
            "When should you ask AI for a table instead of a paragraph?",
            "How would you ask AI to check assumptions in a report?",
            "Write a prompt that asks for an email draft and a shorter version.",
            "Before trusting a number AI gives you, what source would you check it against?"
          ]
    },
    team: {
      duration: copy().durationPaid,
      difficulty: copy().difficulties.team,
      capabilities: vi
        ? "Huấn luyện, SOP, họp, quản lý tri thức, thư viện prompt, quy trình đội ngũ"
        : "Coaching, SOPs, meetings, knowledge management, prompt libraries, team workflows",
      readings: vi
        ? [
            "Cách dùng AI để chuẩn bị huấn luyện, phản hồi và trao đổi hiệu suất.",
            "Cách tạo SOP, checklist và tài liệu đào tạo từ kinh nghiệm nội bộ.",
            "Cách xây thư viện prompt chung với quy tắc bảo mật và kiểm tra chất lượng.",
            "Cách viết quy tắc sử dụng AI một trang mà cả đội có thể làm theo."
          ]
        : [
            "How AI can prepare coaching, feedback, and performance conversations.",
            "How to create SOPs, checklists, and training documents from internal know-how.",
            "How to build a shared prompt library with privacy and quality rules.",
            "How to write a one-page AI usage guide your whole team can follow."
          ],
      quiz: vi
        ? [
            "Một prompt dùng chung cho đội ngũ cần có những phần nào?",
            "Bạn sẽ yêu cầu AI tạo checklist đào tạo nhưng vẫn giữ giọng văn của công ty ra sao?",
            "Khi nào quản lý nên dùng AI để chuẩn bị, nhưng không nên giao quyết định cho AI?",
            "Ba quy tắc nào bạn sẽ đưa vào hướng dẫn AI cho phòng ban của mình trước tiên?"
          ]
        : [
            "What should a reusable team prompt include?",
            "How would you ask AI to create a training checklist while preserving company voice?",
            "When should a manager use AI to prepare, but not delegate the decision?",
            "Which three rules would you put first in an AI guide for your department?"
          ]
    },
    advanced: {
      duration: copy().durationPaid,
      difficulty: copy().difficulties.advanced,
      capabilities: vi
        ? "Tự động hóa, tác nhân AI, đa phương thức, đánh giá đầu ra, công cụ chuyên biệt"
        : "Automation, AI agents, multimodal tools, output evaluation, specialized tools",
      readings: vi
        ? [
            "Khi nào nên dùng chatbot, copilot văn phòng, công cụ hình ảnh, giọng nói hoặc tự động hóa.",
            "Cách thiết kế quy trình AI nhiều bước: nhập dữ liệu, xử lý, kiểm tra, hành động.",
            "Cách đánh giá chất lượng đầu ra: độ đúng, độ đầy đủ, rủi ro và khả năng áp dụng.",
            "Cách chia một việc lớn hằng tháng thành chuỗi prompt có điểm kiểm soát của con người."
          ]
        : [
            "When to use chatbots, office copilots, image tools, voice tools, or automation.",
            "How to design multi-step AI workflows: input, process, verify, act.",
            "How to evaluate output quality: accuracy, completeness, risk, and usefulness.",
            "How to split a big monthly task into a prompt chain with human checkpoints."
          ],
      quiz: vi
        ? [
            "Một tác vụ nào trong công việc của bạn có thể tự động hóa một phần nhưng vẫn cần con người phê duyệt?",
            "Bạn sẽ kiểm tra đầu ra AI bằng tiêu chí nào trước khi gửi cho khách hàng hoặc quản lý?",
            "Hãy chọn công cụ AI phù hợp cho một nhiệm vụ văn bản, một nhiệm vụ dữ liệu và một nhiệm vụ hình ảnh.",
            "Trong quy trình bốn bước của bạn, bước nào bắt buộc phải có con người kiểm tra?"
          ]
        : [
            "Which task in your work could be partly automated but still require human approval?",
            "What criteria would you use before sending AI output to a customer or manager?",
            "Choose an AI tool type for a text task, a data task, and a visual task.",
            "In your four-step workflow, which step must always have a human check?"
          ]
    }
  };

  return plans[state.tier] || starter;
}

function renderStaticCopy() {
  const c = copy();
  document.documentElement.lang = state.language === "vi" ? "vi" : "en";
  document.title = "Everday AI";
  document.querySelector(".brand-lockup").setAttribute("aria-label", "Everday AI home");
  document.querySelector(".brand-subtitle").textContent = c.brandSubtitle;
  document.querySelectorAll(".site-tab").forEach((tab, index) => {
    tab.textContent = c.nav[index];
  });
  document.querySelector("#builtByLabel").textContent = c.builtBy;
  document.querySelector(".overview-band .eyebrow").textContent = c.overviewEyebrow;
  document.querySelector(".overview-band h1").textContent = c.overviewTitle;
  document.querySelector("#overviewBody").textContent = c.overviewBody;
  document.querySelector(".brand-row .eyebrow").textContent = c.profileEyebrow;
  document.querySelector(".brand-row h2").textContent = c.profileTitle;
  document.querySelector(".learner-card .eyebrow").textContent = c.currentPath;
  document.querySelector("label[for='age']").textContent = c.labels.age;
  document.querySelector("label[for='gender']").textContent = c.labels.gender;
  document.querySelector("label[for='industry']").textContent = c.labels.industry;
  document.querySelector("label[for='customIndustry']").textContent = c.labels.customIndustry;
  document.querySelector("label[for='role']").textContent = c.labels.role;
  document.querySelector("label[for='company']").textContent = c.labels.company;
  document.querySelector("label[for='experience']").textContent = c.labels.experience;
  form.age.placeholder = c.placeholders.age;
  form.customIndustry.placeholder = c.placeholders.customIndustry;
  form.role.placeholder = c.placeholders.role;
  form.company.placeholder = c.placeholders.company;
  form.experience.placeholder = c.placeholders.experience;
  promptInput.placeholder = c.placeholders.prompt;
  document.querySelector(".profile-form .primary-action").textContent = c.personalize;
  document.querySelector(".topbar .eyebrow").textContent = c.freeTier;
  document.querySelector(".topbar h2").textContent = c.courseTitle;
  document.querySelector(".site-description").textContent = c.courseDescription;
  document.querySelector(".progress-ring").setAttribute("aria-label", c.progressLabel);
  document.querySelector("#durationLabel").textContent = c.durationLabel;
  document.querySelector("#difficultyLabel").textContent = c.difficultyLabel;
  document.querySelector("#capabilityLabel").textContent = c.capabilityLabel;
  document.querySelectorAll(".lesson-block h4")[0].textContent = c.blocks.learn;
  document.querySelectorAll(".lesson-block h4")[1].textContent = c.blocks.practice;
  document.querySelectorAll(".lesson-block h4")[2].textContent = c.blocks.local;
  document.querySelector("#fluencyEyebrow").textContent = c.fluencyCoach;
  document.querySelector("#fluencyTitle").textContent = c.fluencyTitle;
  document.querySelector("#coachNoteLabel").textContent = c.coachNoteLabel;
  document.querySelector("#coachDrillLabel").textContent = c.coachDrillLabel;
  document.querySelector("#coachStandardLabel").textContent = c.coachStandardLabel;
  document.querySelector("#readingEyebrow").textContent = c.readingEyebrow;
  document.querySelector("#readingTitle").textContent = c.readingTitle;
  document.querySelector("#quizEyebrow").textContent = c.quizEyebrow;
  document.querySelector("#quizTitle").textContent = c.quizTitle;
  document.querySelector(".prompt-coach .eyebrow").textContent = c.promptCoach;
  document.querySelector(".prompt-coach h4").textContent = c.promptTitle;
  document.querySelector("#samplePrompt").textContent = c.useExample;
  document.querySelector("#checkPrompt").textContent = c.checkPrompt;
  document.querySelector(".package-intro .eyebrow").textContent = c.packageEyebrow;
  document.querySelector(".package-intro h3").textContent = c.packageTitle;
  document.querySelector(".package-intro p:last-child").textContent = c.packageDescription;
}

function renderSelects() {
  const c = copy();
  const genderSelect = form.gender;
  genderSelect.innerHTML = "";
  c.genderOptions.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    genderSelect.appendChild(option);
  });

  const industrySelect = form.industry;
  industrySelect.innerHTML = "";
  industryOrder.forEach((industry) => {
    const option = document.createElement("option");
    option.value = industry;
    option.textContent = c.industries[industry];
    industrySelect.appendChild(option);
  });
}

function effectiveIndustryLabel() {
  const c = copy();
  if (state.profile.industry === "Other" && state.profile.customIndustry) {
    return state.profile.customIndustry;
  }
  return c.industries[state.profile.industry] || state.profile.industry || c.industries["Retail and sales"];
}

function effectiveIndustryExample() {
  const c = copy();
  if (state.profile.industry === "Other" && state.profile.customIndustry) {
    return state.language === "vi"
      ? `các nhiệm vụ, khách hàng, quy trình và ưu tiên cụ thể trong ngành ${state.profile.customIndustry}`
      : `the tasks, customers, workflows, and priorities specific to ${state.profile.customIndustry}`;
  }
  return c.industryExamples[state.profile.industry] || c.industryExamples.Other;
}

function companyContext() {
  const company = state.profile.company?.trim();
  if (!company) {
    return "";
  }
  return state.language === "vi"
    ? ` Nội dung cũng sẽ xét đến bối cảnh công ty: ${company}.`
    : ` Lessons will also reflect this company context: ${company}.`;
}

function coachContextIntro() {
  const c = copy();
  const industry = effectiveIndustryLabel();
  const role = state.profile.role?.trim();
  const company = state.profile.company?.trim();
  const experience = state.profile.experience?.trim();
  const parts = [];

  if (role) {
    parts.push(state.language === "vi" ? `vai trò ${role}` : `your ${role} role`);
  }
  if (industry) {
    parts.push(state.language === "vi" ? `ngành ${industry}` : `the ${industry} industry`);
  }
  if (company) {
    parts.push(state.language === "vi" ? `bối cảnh công ty bạn cung cấp` : `the company context you provided`);
  }
  if (experience) {
    parts.push(state.language === "vi" ? `kinh nghiệm thực tế của bạn` : `your real experience`);
  }

  if (!parts.length) {
    return "";
  }

  return state.language === "vi"
    ? `Dựa trên ${parts.join(", ")}, `
    : `Based on ${parts.join(", ")}, `;
}

function renderProfile() {
  const c = copy();
  const { industry, role, experience, company } = state.profile;
  const industryLabel = effectiveIndustryLabel();
  const roleText = role ? `${role} - ${industryLabel}` : `${industryLabel} ${c.learnerSuffix}`;
  document.querySelector("#pathTitle").textContent = roleText || c.defaultPathTitle;
  document.querySelector("#pathSubtitle").textContent = experience || company
    ? `${c.examplesFocus} ${effectiveIndustryExample()}.${companyContext()}`
    : c.defaultPathSubtitle;

  form.age.value = state.profile.age || "";
  form.gender.value = state.profile.gender || "";
  form.industry.value = industry || "Retail and sales";
  form.customIndustry.value = state.profile.customIndustry || "";
  form.role.value = role || "";
  form.company.value = state.profile.company || "";
  form.experience.value = experience || "";
  customIndustryField.classList.toggle("visible", form.industry.value === "Other");
}

function renderTabs() {
  const c = copy();
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tier === state.tier);
    tab.textContent = c.tiers[tab.dataset.tier].tab;
  });

  languageOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.language === state.language);
  });
}

function renderModules() {
  const c = copy();
  moduleList.innerHTML = "";
  const tier = c.tiers[state.tier];
  const plan = modulePlan();
  tier.modules.forEach((module, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `module-button ${index === state.moduleIndex ? "active" : ""}`;
    button.innerHTML = `
      <span class="module-kicker">${c.lesson} ${index + 1} - ${plan.duration}</span>
      <span class="module-title">${module.title}</span>
      <span>${module.summary}</span>
    `;
    button.addEventListener("click", () => {
      state.moduleIndex = index;
      markViewed();
      render();
      saveState();
      pushProfile();
    });
    moduleList.appendChild(button);
  });
}

function renderLesson() {
  const c = copy();
  const module = currentModule();
  const plan = modulePlan();
  const role = state.profile.role || "";
  const contextParts = [];
  if (role) {
    contextParts.push(state.language === "vi" ? `vai trò ${role}` : `the ${role} role`);
  }
  contextParts.push(effectiveIndustryExample());
  if (state.profile.company) {
    contextParts.push(state.language === "vi" ? `bối cảnh công ty: ${state.profile.company}` : `company context: ${state.profile.company}`);
  }
  const customPrefix = state.language === "vi"
    ? `Dựa trên ${contextParts.join(", ")}, hãy ưu tiên các ví dụ gần với công việc thật của bạn. `
    : `Based on ${contextParts.join(", ")}, prioritize examples close to your real work. `;

  document.querySelector("#tierLabel").textContent = c.tiers[state.tier].label;
  document.querySelector("#lessonTitle").textContent = module.title;
  document.querySelector("#lessonSummary").textContent = module.summary;
  document.querySelector("#durationText").textContent = plan.duration;
  document.querySelector("#difficultyText").textContent = plan.difficulty;
  document.querySelector("#capabilityText").textContent = plan.capabilities;
  document.querySelector("#learnText").textContent = customPrefix + module.learn;
  document.querySelector("#practiceText").textContent = module.practice;
  document.querySelector("#localText").textContent = module.local;
  document.querySelector("#coachNote").textContent = `${coachContextIntro()}${c.coachNote}`;
  document.querySelector("#coachDrill").textContent = c.coachDrill;
  document.querySelector("#coachStandard").textContent = c.coachStandard;
  document.querySelector("#readingList").innerHTML = plan.readings.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#quizList").innerHTML = plan.quiz.map((item) => `<li>${item}</li>`).join("");

  const allModules = tierOrder.reduce((total, tierKey) => total + c.tiers[tierKey].modules.length, 0);
  const viewedCount = tierOrder.reduce((total, tierKey) => {
    return total + c.tiers[tierKey].modules.filter((module, index) => state.viewed[`${tierKey}:${index}`]).length;
  }, 0);
  document.querySelector("#progressValue").textContent = `${Math.round((viewedCount / allModules) * 100)}%`;
}

function renderPackages() {
  const c = copy();
  packageList.innerHTML = "";
  c.packages.forEach((pack, index) => {
    const current = state.tier === pack.tier;
    const item = document.createElement("div");
    item.className = `package-item ${current ? "unlocked" : ""}`;
    item.innerHTML = `
      <span class="package-price">${c.levelLabel} ${index + 1}</span>
      <span class="package-title">${pack.title}</span>
      <p>${pack.description}</p>
      <button class="${current ? "secondary-action" : "primary-action"}" type="button">${current ? c.currentLevel : c.openTier}</button>
    `;
    item.querySelector("button").addEventListener("click", () => {
      state.tier = pack.tier;
      state.moduleIndex = 0;
      markViewed();
      render();
      saveState();
      pushProfile();
      showPage("course", true);
    });
    packageList.appendChild(item);
  });
}

function resetContextMessages() {
  const c = copy();
  document.querySelector("#coachFeedback").textContent = c.coachDefault;
}

function checkPrompt() {
  const c = copy();
  const text = promptInput.value.trim();
  const checks = [
    { label: c.promptChecks.task, pass: /\b(write|draft|summarize|compare|translate|create|review|explain|organize|turn|viet|tom tat|so sanh|dich|tao|kiem tra|giai thich|sap xep)\b/i.test(text) },
    { label: c.promptChecks.context, pass: text.length > 80 || /\b(customer|manager|team|supplier|guest|report|role|industry|khach|quan ly|doi ngu|nha cung cap|bao cao|vai tro|nganh)\b/i.test(text) },
    { label: c.promptChecks.format, pass: /\b(bullet|table|email|message|list|paragraph|words|columns|gach dau dong|bang|tin nhan|danh sach|doan|tu|cot)\b/i.test(text) },
    { label: c.promptChecks.quality, pass: /\b(simple|polite|formal|clear|short|respectful|safe|accurate|friendly|don gian|lich su|trang trong|ro rang|ngan|ton trong|an toan|chinh xac|than thien)\b/i.test(text) }
  ];
  const passed = checks.filter((check) => check.pass).map((check) => check.label);
  const missing = checks.filter((check) => !check.pass).map((check) => check.label);

  document.querySelector("#coachFeedback").textContent = missing.length
    ? `${c.promptImprove}: ${missing.join(", ")}. ${c.promptStrongInclude} ${passed.length ? passed.join(", ") + ", " : ""}${c.promptAndTarget}`
    : c.promptGood;
}

function render() {
  renderStaticCopy();
  renderSelects();
  renderProfile();
  renderTabs();
  renderModules();
  renderLesson();
  renderPackages();
  renderAuth();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  state.profile = {
    age: data.get("age"),
    gender: data.get("gender"),
    industry: data.get("industry"),
    customIndustry: data.get("customIndustry").trim(),
    role: data.get("role").trim(),
    company: data.get("company").trim(),
    experience: data.get("experience").trim()
  };
  saveState();
  pushProfile();
  render();
  showPage("course", true);
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    state.tier = tab.dataset.tier;
    state.moduleIndex = 0;
    markViewed();
    render();
    saveState();
    pushProfile();
  });
});

form.industry.addEventListener("change", () => {
  customIndustryField.classList.toggle("visible", form.industry.value === "Other");
});

// ---- Page router: each nav tab is its own page ----
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll("[data-nav]");
const pathToPage = { "/": "overview", "/course": "course", "/profile": "profile", "/levels": "levels" };
const pageToPath = { overview: "/", course: "/course", profile: "/profile", levels: "/levels" };

function showPage(name, push) {
  if (!pageToPath[name]) {
    name = "overview";
  }
  pages.forEach((page) => {
    page.hidden = page.dataset.page !== name;
  });
  siteTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.nav === name);
  });
  if (push) {
    history.pushState({ page: name }, "", pageToPath[name]);
  }
  window.scrollTo(0, 0);
}

function currentPageFromPath() {
  return pathToPage[window.location.pathname] || "overview";
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(link.dataset.nav, true);
  });
});

window.addEventListener("popstate", () => {
  showPage(currentPageFromPath(), false);
});

languageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    state.language = option.dataset.language;
    resetContextMessages();
    clearAuthNotice();
    render();
    saveState();
    pushProfile();
  });
});

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!sb) {
    return;
  }
  const c = copy();
  const email = authEmailInput.value.trim();
  const password = authPasswordInput.value;
  if (!email || password.length < 8) {
    setAuthNotice(c.account.fillBoth, true);
    return;
  }
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) {
    setAuthNotice(c.account.authFailed, true);
    return;
  }
  clearAuthNotice();
  authPasswordInput.value = "";
});

signUpButton.addEventListener("click", async () => {
  if (!sb) {
    return;
  }
  const c = copy();
  const email = authEmailInput.value.trim();
  const password = authPasswordInput.value;
  if (!email || password.length < 8) {
    setAuthNotice(c.account.fillBoth, true);
    return;
  }
  const { error } = await sb.auth.signUp({ email, password });
  if (error) {
    setAuthNotice(c.account.authFailed, true);
    return;
  }
  setAuthNotice(c.account.checkEmail, false);
  authPasswordInput.value = "";
});

logOutButton.addEventListener("click", async () => {
  if (!sb) {
    return;
  }
  const c = copy();
  await sb.auth.signOut();
  currentUser = null;
  render();
  setAuthNotice(c.account.loggedOut, false);
});

if (sb) {
  sb.auth.onAuthStateChange((event, session) => {
    const user = session?.user || null;
    const changed = user?.id !== currentUser?.id;
    currentUser = user;
    if (user && changed) {
      clearAuthNotice();
      loadRemoteProfile();
    }
    renderAuth();
  });
}

document.querySelector("#samplePrompt").addEventListener("click", () => {
  promptInput.value = currentModule().prompt;
  checkPrompt();
});

document.querySelector("#checkPrompt").addEventListener("click", checkPrompt);

markViewed();
saveState();
render();
resetContextMessages();
showPage(currentPageFromPath(), false);
