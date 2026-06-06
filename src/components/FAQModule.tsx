/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: '为什么 WCAG 标准中对大文本（Large Text）的对比度要求（3:1）比普通文本（4.5:1）要低？',
    englishQuestion: 'Why does WCAG require a lower contrast ratio (3:1) for large text than for normal text (4.5:1)?',
    answer: '大字号或粗体文字在人眼视网膜上占用的空间范围更广。由于字符的笔画（stroke）宽度和轮廓面积增加，其形状和特征更加显著，这降低了对亮度对比度的极高敏感性。因此，WCAG 规定：字号在 18pt（约 24px）或更大，或者 14pt（约 18.66px）且加粗（Bold）的文字，只需满足 3:1 (AA 级) 或 4.5:1 (AAA 级) 即可达到相同的辨识效果。',
    englishAnswer: 'Large-scale text has wider stroke widths and larger visual dimensions on the retina, making its letterforms much easier to perceive. Consequently, smaller luminance differences are required to achieve the same legibility. WCAG defines large text as at least 18pt (24px) regular or 14pt (18.66px) bold, needing only a 3:1 ratio for AA compliance.',
  },
  {
    id: 'faq-2',
    question: '相比 WCAG 2.0，WCAG 2.1 新增的生命周期内对比度条文有哪些关键提升？',
    englishQuestion: 'What are the key improvements in color contrast requirements from WCAG 2.0 to WCAG 2.1?',
    answer: 'WCAG 2.1 引入了极其重要的成功准则 1.4.11「非文本对比度（Non-Text Contrast）」。在早期 2.0 标准中，对比度检测几乎仅限于文字或图片文本。2.1 标准填补了非文本视觉界面的空白：要求任何必要的交互式 UI 组件核心部分（如输入框边框、复选框、按钮获得焦点时的聚焦环）以及信息图形（如折线图、图标、统计图中的分区块），其对比度至少要达到 3:1。这极大地保护了辨色力弱的群体在操作复杂功能时的易用性。',
    englishAnswer: 'WCAG 2.1 introduced Success Criterion 1.4.11 (Non-Text Contrast). While WCAG 2.0 only regulated textual information, 2.1 filled critical gaps by requiring a minimum contrast of 3:1 for essential graphical elements, such as UI component borders, state focus rings, select indicators, and descriptive charts & data visualizations.',
  },
  {
    id: 'faq-3',
    question: '为何要在亮度比公式算式中各加上一个 0.05 的偏移量？（例如 L1 + 0.05 / L2 + 0.05）',
    englishQuestion: 'Why is a constant value of 0.05 added to both parts of the contrast ratio formula?',
    answer: '在物理学物理显示标准中，0.05 是为了模拟「环境光反射常数（Ambient Light Flare）」。即使完美的黑色在显示器上发出零亮度（Luminance = 0），房间内的照明依旧会反射在屏幕表面，带来约等同 0.05 的微弱亮度光暈。引入这个常数避免了对纯黑或超深色背景（分母趋近于0）进行对比度换算时，出现除以 0 的极端溢出情况（确保对比度最终区间落在 [1.0 : 21.0] 的科学极限内）。',
    englishAnswer: 'The value of 0.05 corresponds to typical ambient light glare striking the monitor screen. Under standard indoor illumination, even a pure black display registers a minor background reflection. Adding 0.05 scales the mathematical model to align with physical optics and prevents mathematical division-by-zero errors when calculating pure black surfaces.',
  },
  {
    id: 'faq-4',
    question: '前端 CSS 如果通过 opacity 或 box-shadow 会不会影响最终可辨别对比度的计算？该如何应对？',
    englishQuestion: 'Do CSS properties like opacity or box-shadow affect accessible contrast? How do we handle them?',
    answer: '绝对会产生重大影响。相对亮度是基于最终在浏览器呈现的「合成混合色（Composited color）」。当开启 opacity（如 opacity: 0.7）或者带有 RGBA 透明度值时，文本会与底下的层级背景色混合（Alpha Blending）。例如，#FFFFFF 的白字在 #121212 的底色上，如果设定 50% 不透明度，将会变成浅灰色，显著降低对比比率。应对策略是：在计算前，必须求出合成之后的真实不透明度颜色值进行检测。而阴影（Text Shadow）如果范围扩散得当、颜色深，反而能帮助原本不及格的偏亮文字通过对比度审查。',
    englishAnswer: 'Yes. Luminance calculations rely heavily on screen-composited colors. Applying opacity blends the text and its background (Alpha Blending), lowering the effective contrast ratio. Auditors must calculate the blended RGB results beforehand. Interestingly, wide text-shadows or dark outline halos can be intentionally leveraged to pass contrast barriers.',
  },
  {
    id: 'faq-5',
    question: '企业核心品牌标识色（Corporate Brand Colors）若不合规，如何在不违背 WCAG 原则的前提下融合处理？',
    englishQuestion: 'If corporate brand colors fail compliance, how can we adapt them without violating WCAG principles?',
    answer: 'WCAG 明确规定，品牌标识（如企业 Logo 图案、受商标保护的名字）不纳入 1.4.3 的强制对比审查限制。但在构建具体界面的正文、提交表单等功能区块时，不可生硬不作处理地直接沿用不合规的品牌色。行业成熟的过渡方案包括：(1) 将高对比配色作为主干，仅在非交互修饰线条使用标识色；(2) 引入专门的「无障碍配色调色板（Accessible Variant Colors）」，在色值相近的前天下进行亮度微调（如将原品牌天蓝色调暗至深靛蓝色），使得功能按钮完全达标。',
    englishAnswer: 'Brand logotypes are exempt from WCAG 1.4.3. However, interactive controls and body text must not sacrifice readability. Mitigation tactics include: (1) using the brand color solely as non-functional accents, (2) creating a designated, slightly darker/more saturated digital brand variant that achieves compliance, or (3) surrounding weak brand text with clean, contrasting borders.',
  },
];

export default function FAQModule() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6" id="faq-section">
      <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
        <div className="p-1.5 bg-indigo-50 text-indigo-500 rounded-lg">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest leading-none">
            Technical FAQ & Audit Guide
          </h2>
          <p className="text-[10px] text-slate-500 font-sans mt-0.5">
            Deep dive into technical nuances, browser compositing mechanics, and workarounds.
          </p>
        </div>
      </div>

      <div className="space-y-3 font-sans">
        {FAQ_DATA.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="border border-slate-100 rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleOpen(faq.id)}
                className="w-full text-left p-4 bg-slate-50/40 hover:bg-slate-50 flex items-start justify-between gap-4 cursor-pointer focus:outline-hidden"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-900 block font-sans">
                    {faq.question}
                  </span>
                  {faq.englishQuestion && (
                    <span className="text-xxs text-slate-400 block font-serif tracking-wide italic">
                      {faq.englishQuestion}
                    </span>
                  )}
                </div>
                <div className="text-slate-400 mt-1 flex-shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="p-4 bg-white border-t border-slate-50 text-xs text-slate-600 leading-relaxed font-sans space-y-3">
                  <div className="text-slate-750 font-medium">
                    {faq.answer}
                  </div>
                  {faq.englishAnswer && (
                    <div className="border-t border-slate-100 pt-2 text-xxs text-slate-400 leading-normal italic text-justify">
                      {faq.englishAnswer}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
