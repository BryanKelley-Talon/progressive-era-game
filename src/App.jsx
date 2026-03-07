// ============================================================
// "1900: A Nation in Reform"
// US History & Government 11R — Progressive Era
// Regents Standards: 11.5a, 11.5b, 11.5c
// ============================================================

import { useState, useEffect } from 'react';

// ============================================================
// SECTION 1: DATA LAYER
// ============================================================

const SAVE_KEY = 'progressive_era_save_v1';

const INIT_METERS = {
  corporate: 80,
  labor:     25,
  reform:    15,
  political: 20
};

const METER_CONFIG = [
  { key: 'corporate', label: 'Corporate Power', color: '#8B1A1A' },
  { key: 'labor',     label: 'Labor Unrest',    color: '#C17700' },
  { key: 'reform',    label: 'Reform Pressure', color: '#2C6E49' },
  { key: 'political', label: 'Political Will',  color: '#2C4A7C' }
];

const ALL_CHAPTER_META = [
  { id: 1, title: 'The Jungle',           subtitle: 'Chicago · 1900–1906'   },
  { id: 2, title: 'The Muckrakers',        subtitle: 'New York · 1902–1908'  },
  { id: 3, title: 'Trust Busting',         subtitle: 'Washington · 1901–1911'},
  { id: 4, title: "Labor's War",           subtitle: 'New York · 1909–1912'  },
  { id: 5, title: 'Votes for Women',       subtitle: 'National · 1910–1920'  },
  { id: 6, title: 'The Bull Moose',        subtitle: 'National · 1911–1916'  },
  { id: 7, title: 'The Limits of Reform',  subtitle: 'National · 1913–1920'  },
];

const CHAPTERS = [

  // ═══════════════════════════════════════════════════════
  // CHAPTER 1
  // ═══════════════════════════════════════════════════════
  {
    id: 1, title: 'The Jungle', accentColor: '#8B1A1A',
    role: 'Jurgis Rudkus — Lithuanian immigrant, Chicago meatpacking worker',
    years: '1900 – 1906',
    quote: '"I aimed at the public\'s heart and by accident hit it in the stomach."',
    quoteSource: 'Upton Sinclair, on The Jungle, 1906',
    context: [
      'By 1900, Chicago\'s Union Stock Yards processed over nine million animals a year — the industrial heart of American meatpacking. Workers like you arrived by the thousands from Eastern Europe, lured by labor agents who promised steady wages and a new life. What you found was something else: twelve-hour shifts in freezing slaughterhouses, wages barely covering rent in the packed Packingtown tenements, and foremen who could fire a man on a whim.',
      'The industrial economy had produced extraordinary wealth — but that wealth pooled at the top. The "Beef Trust," a cartel of Armour, Swift, and two other giants, colluded to set wages low and prices high. Workers had almost no legal protection. The courts treated unions as conspiracies. Children worked alongside adults. Injuries were common; compensation was not. The Sherman Antitrust Act of 1890 existed but had been mostly used against labor organizers rather than corporations.',
      'Yet pressure was building. Settlement houses like Hull House, founded by Jane Addams, documented conditions. A young socialist named Upton Sinclair spent seven weeks in the stockyards, filling notebooks with what workers told him. The question was not whether conditions would become public — but whether the public would demand change, and whether the government would answer.'
    ],
    decisions: [
      {
        year: '1901', situation: 'A floor foreman approaches you after your shift. He offers you a slightly better position — indoor work, thirty cents more a day — in exchange for reporting which workers complain, slow down, or talk about organizing.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Take the position. Your wife is pregnant. Thirty cents a day keeps your family fed.',
            consequence: 'You take the job. For three months, you pass names to the foreman. Two workers are fired. The extra wages help — but at night you cannot look your neighbors in the eye. You have become part of the machine that grinds them down.',
            meters: { corporate: +5, labor: -8, reform: -5, political: 0 } },
          { label: 'B', text: 'Refuse, and quietly begin talking to workers you trust about organizing.',
            consequence: 'You refuse. The foreman watches you closely for weeks. But in whispered conversations over lunch, you begin connecting with others who feel the same. The seed of something fragile but real takes hold.',
            meters: { corporate: 0, labor: +8, reform: +6, political: +3 } },
          { label: 'C', text: 'Refuse and report the bribery offer to a social worker at the settlement house.',
            consequence: 'A Hull House social worker documents what the foreman proposed. Your name stays out of it — but the account joins a growing file that reformers will one day lay before Congress. You have given them a brick for a wall you cannot yet see.',
            meters: { corporate: -3, labor: +3, reform: +8, political: +2 } }
        ]
      },
      {
        year: '1904', situation: 'The Amalgamated Meat Cutters union is organizing. Management has posted a notice: any worker who joins a union is "subject to immediate dismissal." You have a wife, a young son, and $11 in savings — exactly enough to survive three weeks without work.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Join the union openly. What kind of man hides behind fear?',
            consequence: 'You sign the union card in front of your coworkers. You are fired within the week. You spend two months in desperate poverty before finding work at a rival plant. But your act inspires six others on your floor to join. The union remembers your name.',
            meters: { corporate: 0, labor: +12, reform: +5, political: +4 } },
          { label: 'B', text: 'Join secretly and recruit others quietly.',
            consequence: 'You sign in private and pass the card to trusted coworkers. The quiet organizing works — twelve workers join before management suspects. The union, when the call finally comes, will have more people ready.',
            meters: { corporate: 0, labor: +8, reform: +8, political: +3 } },
          { label: 'C', text: 'Stay out. You cannot risk your family\'s survival for a union that may not win.',
            consequence: 'You stay out. The strike fails anyway — management fires the organizers and replaces them with new immigrants who don\'t know better. Your family survives. But the conditions stay the same, and you live with the weight of choosing safety over solidarity.',
            meters: { corporate: +5, labor: -5, reform: -3, political: -2 } }
        ]
      },
      {
        year: '1906', situation: 'A young journalist named Upton Sinclair has been living in Packingtown for weeks. Through a mutual contact, he finds you and asks you to describe everything you have witnessed — the diseased meat, the worker injuries, the fertilizer room. If management finds out you talked, you will never work in this industry again.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Tell him everything. The truth has to come out.',
            consequence: 'You spend three evenings with Sinclair, describing every detail. When The Jungle causes a national scandal, you recognize your story in its pages. Roosevelt orders a federal investigation. Within months, the Federal Meat Inspection Act becomes law — though it does almost nothing for worker wages.',
            meters: { corporate: -8, labor: +5, reform: +12, political: +8 } },
          { label: 'B', text: 'Share basic facts but insist your name stays out of it entirely.',
            consequence: 'You give Sinclair enough to work with — the broad outline, the patterns — without identifying details. The book is still explosive. Your caution may have cost some of its emotional power, but the legislation passes regardless.',
            meters: { corporate: -5, labor: +3, reform: +8, political: +6 } },
          { label: 'C', text: 'Refuse. You are one bad report away from deportation. This is not your fight.',
            consequence: 'You turn Sinclair away. He finds others willing to talk. The Jungle is published without your story in it. The legislation still passes — other voices carried it. But you wonder sometimes whether your fear cost someone else a chance to be heard.',
            meters: { corporate: 0, labor: 0, reform: +3, political: +2 } }
        ]
      }
    ],
    hingeQuestion: {
      question: 'What was the MOST significant long-term result of the publication of The Jungle (1906)?',
      options: [
        'It immediately improved wages and working conditions for meatpacking workers.',
        'It established a precedent for federal regulatory power over private industry.',
        'It caused a permanent consumer boycott of American meatpacking products.',
        'It led directly to the passage of women\'s suffrage legislation.'
      ],
      correctIndex: 1,
      explanation: 'While Sinclair wrote The Jungle to expose worker exploitation, the public reaction focused on food contamination — prompting Roosevelt to push the Federal Meat Inspection Act and Pure Food and Drug Act (1906). These laws created a new principle: that the federal government had both the authority and the obligation to regulate private industry in the public interest. This was a fundamental break from Gilded Age laissez-faire policy. As Sinclair himself wrote: "I aimed at the public\'s heart and by accident hit it in the stomach." The reform that passed protected consumers more than workers — a lesson about whose interests drive legislation.',
      regentsSkill: 'Causation & Historical Significance'
    },
    crisisTitle: 'THE GREAT STRIKE',
    crisisText: 'The organizing you helped spark ignites into a citywide walkout. 40,000 workers leave the yards. Management calls in strike-breakers from the South, advertising jobs to Black workers who have no other option — deliberately stoking racial tensions to split the labor movement. The strike will fail. But the movement it builds will outlast the defeat.'
  },

  // ═══════════════════════════════════════════════════════
  // CHAPTER 2
  // ═══════════════════════════════════════════════════════
  {
    id: 2, title: 'The Muckrakers', accentColor: '#2C4A7C',
    role: 'Ida B. Wells-Barnett — investigative journalist and civil rights activist, Chicago',
    years: '1902 – 1908',
    quote: '"The way to right wrongs is to turn the light of truth upon them."',
    quoteSource: 'Ida B. Wells-Barnett, 1893',
    context: [
      'The early 1900s produced one of the most powerful waves of investigative journalism in American history. McClure\'s Magazine, Collier\'s, and The Independent published exposés that named names and cited records. Ida Tarbell\'s eighteen-part investigation of Standard Oil ran from 1902 to 1904. Lincoln Steffens documented municipal corruption city by city. The reading public — newly literate, newly middle-class — devoured every word.',
      'Theodore Roosevelt called these writers "muckrakers" after a character in Bunyan\'s Pilgrim\'s Progress who could only look downward at filth. He meant it partly as a compliment and partly as a warning: reform required more than exposure. But the muckrakers understood something Roosevelt sometimes forgot — that without public pressure, politicians had no reason to act. Outrage was the engine of Progressive reform.',
      'Ida B. Wells-Barnett had been doing this work before it had a name. Her 1892 pamphlet Southern Horrors documented the lynching epidemic with statistical precision. Forced to flee Memphis under death threats, she built a national anti-lynching campaign from Chicago. In the Progressive Era, she occupied an uncomfortable position: celebrated in some reform circles, excluded from others. She would help found the NAACP — and then be nearly written out of its founding narrative by the men who controlled the memory of it.'
    ],
    decisions: [
      {
        year: '1903', situation: 'You have documented thirty-seven lynchings with names, dates, and local press accounts. A major Northern newspaper wants to publish — but their editor wants to remove the most graphic details to "avoid upsetting readers." Without those details, you believe, the horror becomes abstraction.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Insist on full publication or nothing. The truth requires the full record.',
            consequence: 'The newspaper refuses. You publish the full account through Black churches and civic organizations. Circulation is smaller — but the readers who find it are changed by it. The record is complete, and history will quote from it.',
            meters: { corporate: 0, labor: 0, reform: +10, political: +5 } },
          { label: 'B', text: 'Accept the edited version to reach the widest possible audience.',
            consequence: 'The piece runs and is read by hundreds of thousands. Letters pour into congressional offices. The details you lost sting — but the campaign reaches people who never would have found your pamphlets. It is a trade you will question for years.',
            meters: { corporate: 0, labor: 0, reform: +6, political: +8 } },
          { label: 'C', text: 'Negotiate: keep the names and dates, lose only the most extreme descriptions.',
            consequence: 'A compromise that satisfies no one fully — but the piece runs with enough specificity to be credible. Sometimes a partial truth is louder than a complete truth no one hears.',
            meters: { corporate: 0, labor: 0, reform: +7, political: +6 } }
        ]
      },
      {
        year: '1906', situation: 'You are invited to speak at a major National American Woman Suffrage Association conference. Privately, the organizing committee asks you not to bring up lynching or racial violence — they fear it will "complicate" the suffrage message and alienate Southern white women whose support they are courting.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Refuse to speak under those conditions. You will not trade one group\'s freedom for another\'s.',
            consequence: 'You decline and publish a letter explaining why. The suffrage leadership is furious. But your letter reaches a new generation of activists who begin to understand that justice cannot be divided without becoming injustice.',
            meters: { corporate: 0, labor: +3, reform: +8, political: +3 } },
          { label: 'B', text: 'Speak — and use your platform to connect suffrage with racial justice anyway.',
            consequence: 'You agree to speak, then argue that liberty is indivisible. The hall goes uncomfortable. Some women walk out. But some stay — and write to you afterward to say they had not considered the connection before.',
            meters: { corporate: 0, labor: 0, reform: +10, political: +4 } },
          { label: 'C', text: 'Speak on suffrage only. You need allies, and this is not the moment to alienate them.',
            consequence: 'You give a powerful speech on women\'s right to vote. You are applauded. The movement gains momentum. But the conditional nature of that applause — contingent on your silence — is a price you feel for the rest of your life.',
            meters: { corporate: 0, labor: 0, reform: +4, political: +8 } }
        ]
      },
      {
        year: '1908', situation: 'The NAACP is being organized. Du Bois, Villard, and others invite you into the founding circle. But you have serious disagreements over strategy: they want cautious legal pressure; you believe in direct, public, confrontational campaigning. You could join and push from within — or stay independent and apply pressure from outside.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Join the NAACP and fight for your approach from the inside.',
            consequence: 'You join. The internal battles are exhausting — your voice is often marginalized by men who find your methods too aggressive. But you help shape the organization\'s early direction, and your presence prevents it from becoming purely an elite legal club.',
            meters: { corporate: 0, labor: +2, reform: +7, political: +9 } },
          { label: 'B', text: 'Stay independent. You can apply more pressure from outside than from within.',
            consequence: 'You stay out. The NAACP grows without you at its center. You continue your anti-lynching work through your own network, achieving local victories the national organization misses. Your independence is real — and so is your isolation.',
            meters: { corporate: 0, labor: 0, reform: +8, political: +4 } },
          { label: 'C', text: 'Join, but make your strategic conditions clear from the beginning.',
            consequence: 'You negotiate your participation openly. Some founders respect this. Others resent it. You remain in the organization\'s orbit — never fully inside, never fully outside. An uncomfortable position that proves, over time, sustainable.',
            meters: { corporate: 0, labor: +3, reform: +8, political: +7 } }
        ]
      }
    ],
    hingeQuestion: {
      question: 'Which best explains why muckraking journalism was a significant turning point in the Progressive Era?',
      options: [
        'Muckrakers replaced politicians as the primary architects of reform legislation.',
        'By documenting specific abuses with evidence, muckrakers created the public pressure that made legislative reform politically possible.',
        'Muckrakers convinced the Supreme Court to overturn pro-business rulings from the Gilded Age.',
        'Muckraking journalism was the first time Americans had access to critical coverage of government corruption.'
      ],
      correctIndex: 1,
      explanation: 'Muckraking journalism was significant not because journalists wrote the laws — they did not — but because their documented exposés transformed public opinion, creating the constituency that made reform politically viable. Politicians like Roosevelt acted because they faced pressure that had been organized and directed by the press. This is the Progressive reform model: documented evidence → public outrage → political will → legislation. What was new was not criticism of power, but the systematic, evidence-based approach and the mass-circulation magazine audience that carried it to millions.',
      regentsSkill: 'Causation & Turning Points'
    }
  },

  // ═══════════════════════════════════════════════════════
  // CHAPTER 3
  // ═══════════════════════════════════════════════════════
  {
    id: 3, title: 'Trust Busting', accentColor: '#4A6741',
    role: 'Theodore Roosevelt — 26th President of the United States',
    years: '1901 – 1911',
    quote: '"No man is above the law and no man is below it."',
    quoteSource: 'Theodore Roosevelt, Third Annual Message to Congress, 1903',
    context: [
      'When Theodore Roosevelt took office after McKinley\'s assassination in September 1901, he inherited a country where corporate monopolies — "trusts" — controlled entire industries. Standard Oil dominated oil refining. U.S. Steel, created by J.P. Morgan, was the first billion-dollar corporation in American history. The railroads manipulated freight rates to favor large shippers over small farmers and businesses. The Sherman Antitrust Act of 1890 existed but had been used more often against labor unions than corporations.',
      'Roosevelt was not anti-capitalist. He believed in the system — but he also believed that unchecked corporate power threatened democracy itself. His approach, the "Square Deal," distinguished between "good" trusts (large but fair) and "bad" trusts (predatory and corrupt). He would use the Sherman Act, the courts, and the bully pulpit to bring the worst offenders to heel. In 1902, his administration filed suit against Northern Securities Company, a railroad holding trust — and won in the Supreme Court 5-4.',
      'The question Roosevelt faced was not whether to regulate, but how far. Conservative Republicans warned that aggressive trust-busting would destroy investment. Progressive reformers wanted structural change beyond breaking up individual companies. And underneath these debates lay a deeper question: in a democracy, could the government ever fully control institutions with more money and organization than the government itself?'
    ],
    decisions: [
      {
        year: '1902', situation: 'The United Mine Workers are on strike in Pennsylvania. 140,000 miners demand an eight-hour day, a 20% wage increase, and union recognition. The coal operators refuse to negotiate — one owner says God himself gave him the right to manage his property. With winter approaching and coal supplies falling, you could seize the mines under emergency powers. No president has ever done this.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Threaten to seize the mines under federal authority — and mean it.',
            consequence: 'You summon both sides to the White House and threaten federal seizure. Stunned, the operators agree to arbitration. The miners get a 10% raise and a nine-hour day. You have established that the federal government will act as an honest broker between capital and labor — a principle with enormous consequences.',
            meters: { corporate: -8, labor: +10, reform: +8, political: +10 } },
          { label: 'B', text: 'Pressure both sides through public statements and behind-the-scenes negotiation.',
            consequence: 'You use public pressure and private meetings to push the operators toward arbitration. The settlement is smaller, but you avoid the constitutional questions that outright seizure would raise. The precedent is softer — but it is still a precedent.',
            meters: { corporate: -4, labor: +6, reform: +5, political: +6 } },
          { label: 'C', text: 'Support the miners publicly but decline to intervene — this is between labor and capital.',
            consequence: 'You express sympathy but decline to act structurally. The strike drags into November. The operators settle on minimal terms. Labor leaders who believed your "Square Deal" rhetoric remember your inaction when it cost them most.',
            meters: { corporate: +3, labor: -3, reform: -2, political: -3 } }
        ]
      },
      {
        year: '1906', situation: 'Congress is debating the Hepburn Act, which would give the Interstate Commerce Commission real power to set railroad freight rates. Railroad lobbyists have gutted the original bill. The version on your desk is weaker than you wanted — but it is what you can actually pass. Holding out risks getting nothing at all.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Sign the weakened bill. Half a loaf is better than none.',
            consequence: 'You sign. The Hepburn Act gives the ICC meaningful rate-setting power for the first time. It is not as strong as you wanted, but it is law — and law can be amended. The railroads\' grip on the economy loosens, slightly.',
            meters: { corporate: -5, labor: +3, reform: +6, political: +7 } },
          { label: 'B', text: 'Veto the weakened bill and demand a stronger version.',
            consequence: 'You veto it and make a public case for stronger regulation. The railroad lobby mobilizes. Congress does not return to the bill for two years. When a new version passes, it is barely stronger. Your stand costs the reform movement two years of momentum.',
            meters: { corporate: +2, labor: 0, reform: +3, political: -4 } },
          { label: 'C', text: 'Sign it, but immediately launch a public campaign for a stronger follow-up law.',
            consequence: 'You sign and declare it the first step. The follow-up campaign keeps railroad regulation in the public eye. A stronger bill — the Mann-Elkins Act — passes under Taft in 1910. Your strategy of building incrementally rather than waiting for perfection defines how Progressive reform moves.',
            meters: { corporate: -5, labor: +3, reform: +7, political: +8 } }
        ]
      },
      {
        year: '1911', situation: 'The Supreme Court has ordered Standard Oil broken up into thirty-four smaller companies. It is a legal victory — but some economists warn the smaller companies will be more aggressively competitive with fewer labor protections. Others note that the Rockefeller family still owns large stakes in all thirty-four companies. Has anything actually changed?',
        question: 'How do you publicly assess this outcome?',
        options: [
          { label: 'A', text: 'Declare victory. The precedent is what matters — the government can break up monopolies.',
            consequence: 'You celebrate the ruling as proof that no corporation is above the law. The precedent holds. Future administrations will use it. Whether Standard Oil\'s breakup benefits workers in the short term matters less than the principle established in law.',
            meters: { corporate: -10, labor: +2, reform: +8, political: +8 } },
          { label: 'B', text: 'Call for further legislation to address the ownership loophole the breakup reveals.',
            consequence: 'You push for legislation targeting holding companies and interlocking corporate ownership. The Clayton Antitrust Act, passed under Wilson in 1914, reflects some of this work. The problem is real — but your warnings are heard as sour grapes after a legal victory.',
            meters: { corporate: -8, labor: +3, reform: +10, political: +5 } },
          { label: 'C', text: 'Acknowledge it is a partial solution — structural change requires more than antitrust law.',
            consequence: 'You give a speech arguing that real economic democracy requires more: stronger labor laws, progressive taxation, perhaps public ownership of utilities. It is your most radical statement. Congress mostly ignores it. But it is the most honest thing you have said as president.',
            meters: { corporate: -7, labor: +5, reform: +10, political: +3 } }
        ]
      }
    ],
    hingeQuestion: {
      question: 'How did Theodore Roosevelt\'s approach to big business represent a significant change in the relationship between the federal government and the economy?',
      options: [
        'Roosevelt eliminated large corporations and returned the American economy to small-business competition.',
        'Roosevelt established that the federal government had the authority and obligation to regulate corporations in the public interest.',
        'Roosevelt\'s approach was blocked by Congress and had no lasting legislative impact.',
        'Roosevelt proved that antitrust law was an ineffective tool against monopoly power.'
      ],
      correctIndex: 1,
      explanation: 'Roosevelt did not destroy big business — he established the principle that the federal government had the authority and responsibility to regulate corporations in the public interest. The Sherman Act had existed since 1890 but had been mostly applied against labor unions. Roosevelt\'s use of it against Northern Securities (1902) and Standard Oil (1911), combined with legislation like the Hepburn Act (1906) and Pure Food and Drug Act (1906), created what historians call the "regulatory state" — a permanent federal role in overseeing private economic activity. This was a fundamental shift from the laissez-faire approach of the Gilded Age. Many of these regulatory frameworks were the direct ancestors of New Deal legislation.',
      regentsSkill: 'Continuity & Change Over Time'
    }
  },

  // ═══════════════════════════════════════════════════════
  // CHAPTER 4
  // ═══════════════════════════════════════════════════════
  {
    id: 4, title: "Labor's War", accentColor: '#6B4226',
    role: 'Clara Lemlich — garment worker and union organizer, Lower East Side, New York',
    years: '1909 – 1912',
    quote: '"I am a working girl, one of those who are on strike against intolerable conditions."',
    quoteSource: 'Clara Lemlich, Cooper Union, November 22, 1909',
    context: [
      'In the tenement factories of New York\'s Lower East Side, young immigrant women — mostly Jewish and Italian, mostly between sixteen and twenty-five — stitched shirtwaists twelve hours a day, six days a week, for wages as low as $3 a week. The factories were crowded into the upper floors of Lower Manhattan buildings. Exits were sometimes locked by owners to prevent theft of materials. Inspectors could be bribed. The International Ladies\' Garment Workers\' Union existed but was small and largely ineffective.',
      'On November 22, 1909, Clara Lemlich — a twenty-three-year-old Ukrainian immigrant who had already been beaten by company thugs for her organizing work — rose at a packed Cooper Union meeting and gave an impromptu speech in Yiddish. She called for a general strike. Twenty thousand garment workers walked out the next morning. The "Uprising of the Twenty Thousand" forced many manufacturers to settle — shorter hours, higher wages, some safety improvements. But not all shops settled. The Triangle Waist Company did not.',
      'On March 25, 1911, a fire broke out on the upper floors of the Triangle Shirtwaist Factory. Exit doors were locked. The fire escapes collapsed. In 18 minutes, 146 workers — mostly young women — died. The city watched. The country watched. And the question became: what would government do with the grief and the outrage that followed?'
    ],
    decisions: [
      {
        year: '1909', situation: 'It is the night of the Cooper Union meeting. The ILGWU leadership has been cautious — they doubt a general strike can be sustained. You are largely unknown. You have been beaten twice on the picket line. But twenty thousand workers are in this hall, and the energy is like nothing you have felt before. The chairman is wrapping up without a strike call.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Push to the microphone and call for a general strike in Yiddish — right now, in front of everyone.',
            consequence: '"I am tired of the speakers! I move that we go on general strike!" The hall erupts. Twenty thousand workers walk out the next morning. The union leadership scrambles to catch up — but the movement is moving, with or without them.',
            meters: { corporate: -5, labor: +15, reform: +8, political: +5 } },
          { label: 'B', text: 'Speak but call for a formal vote rather than a unilateral declaration.',
            consequence: 'You speak and propose a vote. It passes overwhelmingly. The strike begins with more organizational structure but less spontaneous energy. Slightly smaller — but better organized.',
            meters: { corporate: -3, labor: +10, reform: +6, political: +5 } },
          { label: 'C', text: 'Stay seated. Let the ILGWU leadership take the step. Your moment will come later.',
            consequence: 'The meeting ends without a general strike call. Some workers walk out in small groups over the following weeks. The movement fragments. Three months later, the Triangle Waist Company still hasn\'t settled.',
            meters: { corporate: +3, labor: +2, reform: 0, political: -2 } }
        ]
      },
      {
        year: '1911', situation: 'The day after the Triangle fire, 100,000 people fill the streets of New York. The owners, Isaac Harris and Max Blanck, are charged with manslaughter. You are asked to testify about the locked doors — you personally saw them locked. The defense will attack your credibility, your immigration status, your union affiliation.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Testify. The dead deserve a witness.',
            consequence: 'You testify clearly and in detail. The defense tries to discredit you. The jury acquits Harris and Blanck anyway — the prosecution cannot prove they personally knew the doors were locked. You are devastated. But your testimony is in the record, and the record will outlast the verdict.',
            meters: { corporate: 0, labor: +5, reform: +10, political: +8 } },
          { label: 'B', text: 'Provide a written statement with union legal support to control how your words are used.',
            consequence: 'Your statement is precise and hard to attack. The jury still acquits, but the documented record helps build the legislative case that follows. Al Smith and Robert Wagner read every word.',
            meters: { corporate: 0, labor: +4, reform: +8, political: +7 } },
          { label: 'C', text: 'Decline to testify in court but speak publicly and to the press instead.',
            consequence: 'You speak at rallies and to newspapers. Your public voice drives the political pressure even as the criminal case collapses. Watching the crowds from Albany, Al Smith and Robert Wagner begin their legislative work.',
            meters: { corporate: 0, labor: +3, reform: +7, political: +9 } }
        ]
      },
      {
        year: '1912', situation: 'After the fire, the New York State Factory Investigating Commission — led by Robert Wagner and Al Smith — is touring factories and drafting new labor legislation. They want your help documenting conditions. But some union leaders argue: focus on organizing, not government testimony — legislation without union power behind it won\'t be enforced.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Work with the commission. Legislation can protect workers that unions can\'t yet reach.',
            consequence: 'You spend months guiding inspectors through factories they would never find on their own. The resulting legislation — thirty-six new labor laws in three years — sets the template for the New Deal two decades later. Wagner and Smith remember who made it possible.',
            meters: { corporate: -8, labor: +8, reform: +12, political: +10 } },
          { label: 'B', text: 'Continue organizing. Laws without unions to enforce them aren\'t worth the paper.',
            consequence: 'You focus on building ILGWU membership. The laws pass anyway with other advocates\' help. Your union grows stronger. In the long run, both the laws and the unions prove necessary — neither alone is sufficient.',
            meters: { corporate: -5, labor: +12, reform: +6, political: +5 } },
          { label: 'C', text: 'Do both — testify and organize simultaneously, even if it stretches you thin.',
            consequence: 'You become the connective tissue between the labor movement and the legislature — a bridge figure that neither side fully trusts, and both sides need. The exhaustion is real. So is the impact.',
            meters: { corporate: -6, labor: +10, reform: +10, political: +8 } }
        ]
      }
    ],
    hingeQuestion: {
      question: 'Why is the Triangle Shirtwaist Factory Fire (1911) considered a turning point in the history of American labor?',
      options: [
        'The fire immediately led to the arrest and conviction of factory owners for criminal negligence.',
        'The fire shocked public conscience and created the political will for comprehensive labor safety legislation that laid the groundwork for later New Deal programs.',
        'The fire proved that labor unions alone, without government action, could protect workers.',
        'The fire ended Progressive Era reform momentum by revealing the limits of what government could accomplish.'
      ],
      correctIndex: 1,
      explanation: 'The Triangle fire did not result in criminal convictions — the owners were acquitted. But it transformed public opinion and created an unprecedented window of political will. The New York State Factory Investigating Commission, led by Robert Wagner Sr. and Al Smith, used that moment to pass thirty-six labor laws in three years: factory safety, fire prevention, working hours, child labor restrictions, and workers\' compensation. These men — and the legislation they built — went on to shape the New Deal. The Triangle fire demonstrates how tragedies become turning points when they intersect with organized reform pressure already in motion.',
      regentsSkill: 'Turning Points & Causation'
    },
    isCrisisChapter: true,
    crisisTitle: 'THE TRIANGLE FIRE',
    crisisText: 'The fire escapes collapse. The exit doors are locked. In eighteen minutes, 146 workers are dead — mostly young women, many of them jumping to escape the flames. New York City grieves in the streets. 100,000 people march in the rain. The question is no longer whether reform will come. The question is whether it will come fast enough — and for whom.'
  },

  // ═══════════════════════════════════════════════════════
  // CHAPTER 5
  // ═══════════════════════════════════════════════════════
  {
    id: 5, title: 'Votes for Women', accentColor: '#7B5EA7',
    role: 'Alice Paul — suffragist organizer, National Woman\'s Party',
    years: '1910 – 1920',
    quote: '"There will never be a new world order until women are a part of it."',
    quoteSource: 'Alice Paul, c. 1915',
    context: [
      'In 1910, no Eastern state gave women the right to vote in federal elections. Women had been organizing for suffrage since Seneca Falls in 1848 — sixty-two years of petition drives, legislative campaigns, and public speeches had produced minimal results in the East. The antisuffrage movement, backed by liquor interests, Southern conservatives, and urban political machines, remained powerful.',
      'Two strategies shaped the suffrage movement\'s final decade. The older National American Woman Suffrage Association, led by Carrie Chapman Catt, preferred a state-by-state strategy: win enough states to create political pressure for a federal amendment. Alice Paul, who had studied militant tactics with the British suffragettes, believed only direct confrontation would work. In 1913, she organized a parade down Pennsylvania Avenue the day before Wilson\'s inauguration — 5,000 women marching past jeering crowds while police stood by.',
      'The debate between these strategies — incremental versus confrontational, coalition-building versus direct action — was not merely tactical. It reflected deep disagreements about how democratic change actually happened. And underneath both strategies lay a question neither faction fully answered: whose suffrage? Black women, who supported both factions and received full support from neither, navigated a movement that often required them to choose between their race and their gender.'
    ],
    decisions: [
      {
        year: '1913', situation: 'You are organizing the suffrage parade for March 3rd — the day before Wilson\'s inauguration. A delegation from Howard University, led by Mary Church Terrell, asks to march alongside the state delegations. Some NAWSA leaders argue that including Black women openly will cost crucial Southern white support and potentially doom the amendment.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'March together, fully integrated — the principle does not bend.',
            consequence: 'The Howard delegation marches. Southern newspapers erupt. Several Southern suffragists withdraw their names. The parade is smaller but morally consistent. Within the movement, the decision defines fault lines that will not fully heal for generations.',
            meters: { corporate: 0, labor: +5, reform: +10, political: +3 } },
          { label: 'B', text: 'Integrate the march but seat Black delegations at the back — a shameful compromise to preserve the coalition.',
            consequence: 'Ida B. Wells-Barnett, who came to march with the Illinois delegation, steps out from the crowd and joins the main line anyway. The compromise satisfies no one and marks a permanent fracture between the two movements.',
            meters: { corporate: 0, labor: 0, reform: +3, political: +5 } },
          { label: 'C', text: 'Exclude Black delegations from the march. The amendment comes first.',
            consequence: 'The march is large and white. It is celebrated nationally. The amendment eventually passes — seven years later — with a Southern compromise that will effectively exclude Black women from voting through Jim Crow for decades to come.',
            meters: { corporate: 0, labor: -3, reform: -3, political: +7 } }
        ]
      },
      {
        year: '1917', situation: 'Silent Sentinels — women you organized to picket the White House — have been arrested and sent to the Occoquan Workhouse. They are being force-fed after going on hunger strike. The "Night of Terror" — when guards beat and assaulted the prisoners — has not yet leaked to the press. You can release the story now. Wilson wants it suppressed.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Release everything to the press immediately.',
            consequence: 'The story runs in every major newspaper. The public is horrified. Wilson, already embarrassed, orders the prisoners released. Two months later, he publicly announces support for the federal amendment. The brutality he ordered hidden becomes the thing that breaks his resistance.',
            meters: { corporate: 0, labor: +3, reform: +10, political: +10 } },
          { label: 'B', text: 'Use the story privately as leverage with the White House before going public.',
            consequence: 'You send word to Wilson\'s staff: release the prisoners, or the story runs. They release the prisoners within twenty-four hours. The story never fully runs. You secured their freedom — but the government faces no public accountability for what it did.',
            meters: { corporate: 0, labor: +3, reform: +5, political: +8 } },
          { label: 'C', text: 'Wait until the women are safely released, then tell the story.',
            consequence: 'By the time the story runs, the urgency has cooled. The press covers it, but without the immediacy of prisoners still in cells. Wilson makes no statement. The movement loses three months of momentum.',
            meters: { corporate: 0, labor: +2, reform: +4, political: +4 } }
        ]
      },
      {
        year: '1920', situation: 'The Nineteenth Amendment has passed. In theory, all women can now vote. In practice, Jim Crow laws — poll taxes, literacy tests, grandfather clauses, violence — will prevent most Black women in the South from voting for decades. NAWSA leaders are celebrating. NAACP leaders are calling the amendment "a hollow victory for half of our women."',
        question: 'How do you respond publicly?',
        options: [
          { label: 'A', text: 'Acknowledge the gap publicly and commit the movement to fighting voting suppression.',
            consequence: 'Your statement acknowledges that legal suffrage is not yet real suffrage for all women. Many suffrage leaders are furious — they see it as undermining the victory. But you have named what will become the central unfinished business of American democracy.',
            meters: { corporate: 0, labor: +5, reform: +10, political: +3 } },
          { label: 'B', text: 'Celebrate the amendment\'s passage and call it the foundation for future fights.',
            consequence: 'You celebrate the victory and note "more work remains." The movement disbands with a sense of completion that papers over the exclusion of millions of Black women. The equal rights amendment will wait another generation.',
            meters: { corporate: 0, labor: 0, reform: +4, political: +8 } },
          { label: 'C', text: 'Say nothing political. You fought for one thing, you won it. Others must fight for theirs.',
            consequence: 'You remain silent on voting rights enforcement. The organizations fighting disenfranchisement receive no support from the suffrage movement\'s network or funding. The fracture between the women\'s rights movement and the civil rights movement deepens into a chasm that lasts for decades.',
            meters: { corporate: 0, labor: -3, reform: -2, political: +5 } }
        ]
      }
    ],
    hingeQuestion: {
      question: 'What does the internal debate between confrontational and incremental suffrage tactics BEST illustrate about how democratic change happens?',
      options: [
        'Radical confrontational tactics are always more effective than moderate coalition-building in achieving reform.',
        'Both confrontational and incremental strategies played necessary roles — confrontation created urgency while coalition-building secured legislative passage.',
        'Reform requires unanimous agreement within a movement before it can succeed.',
        'Democratic change in the United States has always required presidential support before Congress will act.'
      ],
      correctIndex: 1,
      explanation: 'Neither the radical nor the moderate wing of the suffrage movement could have won alone. Alice Paul\'s militant tactics — the 1913 parade, the White House pickets, the hunger strikes — created public spectacle and political pressure that made inaction costly. Carrie Chapman Catt\'s "Winning Plan" built the state-by-state coalition that gave the amendment its path to ratification. The Nineteenth Amendment required both: the confrontational tactics that forced the issue onto the national agenda, and the organizational work that converted that attention into legislative votes. This pattern — radical pressure combined with institutional coalition-building — recurs throughout American reform history and is a signature feature of how the Regents exam expects students to analyze reform movements.',
      regentsSkill: 'Comparison & Argument Development'
    }
  },

  // ═══════════════════════════════════════════════════════
  // CHAPTER 6
  // ═══════════════════════════════════════════════════════
  {
    id: 6, title: 'The Bull Moose', accentColor: '#C17700',
    role: 'Jane Addams — Hull House founder, Progressive Party delegate',
    years: '1911 – 1916',
    quote: '"The good we secure for ourselves is precarious and uncertain until it is secured for all of us."',
    quoteSource: 'Jane Addams, 1892',
    context: [
      'By 1912, the Republican Party was fracturing. William Howard Taft, Roosevelt\'s chosen successor, had moved in a conservative direction — backing down on railroad regulation, firing Roosevelt\'s conservation chief, and supporting a high tariff that benefited eastern manufacturers at the expense of consumers. Roosevelt, convinced that Taft had betrayed the Progressive legacy, challenged him for the Republican nomination and lost — the party machinery was in Taft\'s hands.',
      'Roosevelt bolted and formed the Progressive Party — called the Bull Moose Party after he boasted he felt "as strong as a bull moose." The platform was the most ambitious domestic agenda a major American party had ever offered: women\'s suffrage, an eight-hour workday, a minimum wage for women, direct election of senators, workers\' compensation, prohibition of child labor, and a federal income tax. It was the entire Progressive Era agenda in a single document.',
      'Jane Addams seconded Roosevelt\'s nomination — the first woman to second a major party presidential nomination. But the party carried a contradiction she could not resolve: the platform included no racial equality plank, and Black delegates from Southern states were excluded from the convention floor to avoid alienating white Southern Progressives. Addams voted for the platform. The decision haunted her.'
    ],
    decisions: [
      {
        year: '1912', situation: 'You are preparing to second Theodore Roosevelt\'s nomination at the Progressive Party convention. Du Bois and the NAACP have sent a letter: they cannot support a party that excludes Black delegates and has no racial equality plank. They are asking you to withhold your endorsement unless the plank is added. Roosevelt wants you on stage. The plank will not be added.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Refuse to second the nomination without the racial equality plank.',
            consequence: 'You send word that you cannot appear without the plank. Roosevelt is furious. You are not on stage. The party nominates him without you. The Progressive platform passes without the plank. You have maintained your principle — and lost your seat at the table where the most ambitious reform agenda in a generation is being written.',
            meters: { corporate: 0, labor: +3, reform: +8, political: -5 } },
          { label: 'B', text: 'Second the nomination, but use your speech to call for the racial plank directly.',
            consequence: 'You second and address racial equality from the podium. The hall goes uncomfortable. The plank is still not added. But your speech is published and read. Du Bois quotes it in The Crisis. You spoke the truth in the room that didn\'t want to hear it.',
            meters: { corporate: 0, labor: +3, reform: +10, political: +5 } },
          { label: 'C', text: 'Second the nomination. The platform\'s other planks will help far more people than staying out will.',
            consequence: 'You appear on stage and second the nomination. The platform is the most progressive in American party history. Roosevelt loses in November — to Wilson. The platform\'s ideas shape the New Deal two decades later. The racial exclusion you accepted is a stain on your legacy that you will carry for the rest of your life.',
            meters: { corporate: 0, labor: +5, reform: +6, political: +8 } }
        ]
      },
      {
        year: '1913', situation: 'Woodrow Wilson — who ran as a progressive — is now segregating the federal civil service. Black federal workers are being separated into different offices, cafeterias, and bathrooms. Wilson says it is "kindness" to prevent "racial friction." You have access to Wilson through reform networks. What you do will be remembered.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Organize a direct delegation to Wilson — bring Black leaders including Du Bois to the White House.',
            consequence: 'The delegation goes. Wilson is cold and dismissive. When Du Bois speaks plainly, Wilson ends the meeting. The re-segregation continues. But the refusal to remain silent is documented, and the delegation draws press coverage that embarrasses the administration nationally.',
            meters: { corporate: 0, labor: +3, reform: +8, political: +5 } },
          { label: 'B', text: 'Publish a joint statement with NAACP leaders condemning the policy.',
            consequence: 'The statement runs in major papers and The Crisis. It is your clearest public statement on race and governance. Wilson ignores it. But the coalition between Progressive reform and civil rights organizations is strengthened — a connection that matters in later decades.',
            meters: { corporate: 0, labor: +3, reform: +8, political: +6 } },
          { label: 'C', text: 'Work through private channels — use your relationships to urge Wilson to reverse course quietly.',
            consequence: 'You write private letters and request private meetings. Wilson\'s staff acknowledges them politely. The re-segregation continues. Your private approach keeps your relationships intact — and allows you to tell yourself, in public, that you have not failed.',
            meters: { corporate: 0, labor: 0, reform: +2, political: +3 } }
        ]
      },
      {
        year: '1916', situation: 'The United States is moving toward entering World War I. Many of your Progressive allies support the war as a democratic cause. Some are calling you unpatriotic for opposing it. If you maintain your position, you risk losing the political coalitions that carry your domestic reform agenda forward.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Maintain your anti-war position publicly, whatever the cost to reform coalitions.',
            consequence: 'You speak out against the war. You are called a traitor in the press. The government monitors your correspondence. You are frozen out of reform networks you built for a decade. In 1931, you win the Nobel Peace Prize. In 1917, you are alone — and right.',
            meters: { corporate: 0, labor: +2, reform: +5, political: -8 } },
          { label: 'B', text: 'Stay silent on the war to protect the domestic reform agenda.',
            consequence: 'You say nothing about the war. Your reform relationships survive. But your silence is noticed and remembered. You survive the war politically. You also live with the knowledge of what your silence cost those counting on your voice.',
            meters: { corporate: 0, labor: 0, reform: +3, political: +5 } },
          { label: 'C', text: 'Channel your opposition through the Women\'s International League for Peace and Freedom.',
            consequence: 'You operate through transnational networks rather than American political ones. You preserve your domestic relationships while maintaining your principles — a narrower path, but one that holds. The WILPF becomes one of the longest-lived peace organizations in history.',
            meters: { corporate: 0, labor: +2, reform: +6, political: +2 } }
        ]
      }
    ],
    hingeQuestion: {
      question: 'What does the Progressive Party\'s 1912 platform BEST illustrate about the nature of Progressive Era reform?',
      options: [
        'Progressive reformers achieved most of their goals during the presidency of Theodore Roosevelt.',
        'The Progressive movement succeeded because it united all reform factions behind a single agenda.',
        'Progressive Era reform was transformative in its ambitions but contradictory in its application — advancing rights for some while accepting the exclusion of others.',
        'The Progressive Party\'s platform proved that third parties are the most effective vehicle for policy reform in America.'
      ],
      correctIndex: 2,
      explanation: 'The Bull Moose platform of 1912 was genuinely transformative — it contained the seeds of the minimum wage, Social Security, workers\' compensation, and direct democracy. Many of its proposals became law under the New Deal. But the same convention adopted this agenda while excluding Black delegates and refusing a racial equality plank, explicitly trading Black civil rights for white Southern Progressive support. This contradiction — reform for some, exclusion for others — is characteristic of the Progressive Era as a whole. It reflects a movement whose vision of who counted as "the public" was radically incomplete — a pattern students should be able to identify and analyze on the Regents exam.',
      regentsSkill: 'Sourcing & Contextualization'
    }
  },

  // ═══════════════════════════════════════════════════════
  // CHAPTER 7
  // ═══════════════════════════════════════════════════════
  {
    id: 7, title: 'The Limits of Reform', accentColor: '#3A3A5C',
    role: 'James Weldon Johnson — poet, diplomat, and NAACP field secretary',
    years: '1913 – 1921',
    quote: '"Life is a raw material we are given — what we make of it is our own work."',
    quoteSource: 'James Weldon Johnson, Along This Way, 1933',
    context: [
      'The Progressive Era transformed the relationship between the federal government and the economy. It produced the Federal Reserve, the income tax, the direct election of senators, food safety laws, labor regulations, and women\'s suffrage. The institutional architecture of American governance in 1920 was measurably more democratic and more capable of limiting corporate power than it had been in 1900. These were real achievements, won through real struggle.',
      'But for approximately ten million Black Americans — roughly 10% of the national population — the Progressive Era was something different. Woodrow Wilson re-segregated the federal government. D.W. Griffith\'s Birth of a Nation (1915), glorifying the Ku Klux Klan, was screened at the White House. Between 1910 and 1920, the Great Migration began — approximately 500,000 Black Americans left the South for Northern cities, trading one form of oppression for another. In the North, they found factory work sometimes, but also segregated neighborhoods, discriminatory unions, and periodic racial violence. The Red Summer of 1919 saw race riots in over twenty cities.',
      'This final chapter asks the question the Progressive Era could not answer: what does "progress" mean when it is not equally distributed? And what is the obligation of reformers who benefit from a system that others are still fighting to enter? This is not a question with an easy answer. It is the question the Regents exam — and American history itself — asks you to sit with.'
    ],
    decisions: [
      {
        year: '1915', situation: 'Woodrow Wilson is about to attend a private screening of The Birth of a Nation — a film depicting Black men as predators and celebrating the KKK. The revived Klan is using it as a recruiting tool. Riots have broken out after screenings. You have an opportunity to get a message to Wilson before he endorses the film publicly.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'Threaten a national boycott of Wilson\'s agenda if he endorses the film.',
            consequence: 'The threat reaches Wilson\'s staff. Wilson does not formally endorse the film — but is reportedly quoted calling it "like writing history with lightning." The film plays across the country. Your threat cost you some Progressive allies who resent the confrontational tone — but it established the NAACP as a political force that could not be ignored.',
            meters: { corporate: 0, labor: +3, reform: +7, political: +5 } },
          { label: 'B', text: 'Organize public protests and press coverage before the screening.',
            consequence: 'NAACP chapters in twelve cities hold protests before opening night. The coverage makes Wilson\'s private viewing more embarrassing than he intended. The film still plays. But the NAACP\'s capacity to organize nationally is demonstrated and grown.',
            meters: { corporate: 0, labor: +5, reform: +8, political: +7 } },
          { label: 'C', text: 'Focus on the legal case — petition cities to ban the film on public safety grounds.',
            consequence: 'You file municipal petitions in several cities. Most allow the film anyway. The legal route is slower and less visible than protest, but it builds a framework for future challenges and establishes the NAACP as a legal advocacy organization. The long game.',
            meters: { corporate: -3, labor: +2, reform: +6, political: +6 } }
        ]
      },
      {
        year: '1917', situation: 'The East St. Louis Massacre has just killed an estimated 100–200 Black Americans and driven 6,000 from their homes. The federal government has not responded. You are organizing a silent protest march down Fifth Avenue in New York City — thousands of Black men, women, and children, dressed in white, marching in complete silence to drums. Some advisors say the march risks backlash.',
        question: 'What do you do?',
        options: [
          { label: 'A', text: 'March. Silence is its own statement.',
            consequence: 'Ten thousand people march down Fifth Avenue in complete silence. Spectators watch in stunned quiet. The photographs run in newspapers across the country. Congress does not pass anti-lynching legislation. But the march demonstrates that Black Americans will answer violence with dignity — and that their response can be more powerful than any speech.',
            meters: { corporate: 0, labor: +5, reform: +10, political: +7 } },
          { label: 'B', text: 'March and present a formal petition to Congress demanding federal anti-lynching legislation.',
            consequence: 'The march happens and is powerful. The petition is received, assigned to committee, and never voted on. The combination of visible protest and formal legislative demand becomes the template for future civil rights strategy — even when the immediate result is nothing.',
            meters: { corporate: 0, labor: +5, reform: +10, political: +8 } },
          { label: 'C', text: 'Focus on lobbying Congress directly — a march will make legislators defensive.',
            consequence: 'You bring NAACP delegates to Washington. Several senators meet with you politely. None introduce legislation. The massacre fades from public memory within months. The decision to prioritize access over pressure haunts the movement\'s strategic debates for years.',
            meters: { corporate: 0, labor: +2, reform: +4, political: +4 } }
        ]
      },
      {
        year: '1921', situation: 'The Progressive Era is ending. Women have won the vote — but Jim Crow ensures millions of Black women cannot use it. Labor laws exist — but discriminatory unions exclude Black workers. The federal regulatory state is real — but it protects some Americans far more than others. You are asked to write the movement\'s legacy in a single speech.',
        question: 'What do you say?',
        options: [
          { label: 'A', text: 'Name the contradiction clearly: progress happened, and it happened unevenly. Both things are true.',
            consequence: 'Your speech is quoted in newspapers, Black and white. It makes people uncomfortable — because it is accurate. You refuse to let the movement take full credit without taking full responsibility. The speech defines the NAACP\'s agenda for the next generation.',
            meters: { corporate: 0, labor: +5, reform: +10, political: +6 } },
          { label: 'B', text: 'Celebrate the gains and call for continued work. This is not the moment for critique.',
            consequence: 'Your celebratory statement is welcomed by Progressive allies. The coalition feels good. The disenfranchisement continues. In fifteen years, you will regret the ease with which you gave credit where it was not fully earned.',
            meters: { corporate: 0, labor: 0, reform: +3, political: +8 } },
          { label: 'C', text: 'Name the unfinished work specifically: the Dyer Anti-Lynching Bill, voting rights enforcement, fair labor access.',
            consequence: 'You redirect public energy toward concrete legislative goals. The Dyer Bill passes the House in 1922 and is filibustered in the Senate. The agenda is right. The obstacles are structural. You have named the next fifty years of work.',
            meters: { corporate: 0, labor: +5, reform: +8, political: +5 } }
        ]
      }
    ],
    hingeQuestion: {
      question: 'What does the experience of Black Americans during the Progressive Era MOST clearly demonstrate about reform in American democracy?',
      options: [
        'The Progressive Era proves that all groups benefit equally when the federal government becomes more active in regulating the economy.',
        'Reform movements in America have historically depended on the exclusion of some groups to build the coalitions large enough to help others.',
        'The Progressive Era shows that economic reform and racial justice are fundamentally incompatible goals.',
        'Black Americans made no meaningful progress during the Progressive Era because all reform movements were controlled by white elites.'
      ],
      correctIndex: 1,
      explanation: 'The Progressive Era demonstrates that American reform has historically required coalition-building that involved strategic exclusions. The suffrage amendment was won partly through Southern white women whose support depended on not challenging Jim Crow. The Bull Moose platform excluded racial equality to secure Southern Progressive support. Wilson\'s reform coalition required Southern Democrats who demanded re-segregation. This is not the result of individual bad choices alone — it reflects a structural feature of American democratic politics: the coalitions large enough to pass reform are often built on agreements to sacrifice the rights of some members. Recognizing this pattern — and its recurrence in American reform history — is what the Regents exam means by historical thinking.',
      regentsSkill: 'Contextualization & Argument'
    }
  }
];

// ============================================================
// SECTION 2: VERDICT SYSTEM
// ============================================================

function getVerdict(meters) {
  const score = (meters.reform + meters.political + meters.labor) - meters.corporate;
  if (score >= 120) return {
    title: 'The Progressive Promise',
    subtitle: 'Reform Built to Last',
    color: '#2C6E49',
    description: 'You pushed the Progressive Era to its fullest potential — building regulatory institutions, empowering labor, and expanding the democratic base. The legislative achievements of this era became the foundation of the New Deal. But as you write this final chapter, one question remains unanswered: whose progress was this, really? The gauges measure power and pressure. They do not measure who was left outside the frame.'
  };
  if (score >= 70) return {
    title: 'The Unfinished Era',
    subtitle: 'Progress and Its Limits',
    color: '#C17700',
    description: 'You achieved real change — labor laws, antitrust enforcement, democratic reform — while navigating the contradictions the era could not resolve. This is, in fact, the most historically accurate outcome. The Progressive Era was genuinely transformative and genuinely incomplete. It built institutions that lasted. It also built them on exclusions that lasted just as long.'
  };
  if (score >= 20) return {
    title: 'Reform Without Justice',
    subtitle: 'The Partial Victory',
    color: '#7B5EA7',
    description: 'Change came — but cautiously, and selectively. The regulatory architecture grew, but the movements that pushed hardest for equity were often the ones that were sacrificed to preserve the coalition. The pattern you have played out here repeats across American history: progress for some, patience demanded of others. The Regents exam will ask you to name this pattern and explain why it persisted.'
  };
  return {
    title: 'The Gilded Persistence',
    subtitle: 'When the System Holds',
    color: '#8B1A1A',
    description: 'The corporate order survived largely intact. Reform rhetoric exceeded reform reality. This too is a historically accurate outcome — for every legislative victory of the Progressive Era, there were dozens of failed bills, abandoned campaigns, and movements that ran out of time. Understanding why reform fails is as important as understanding why it succeeds.'
  };
}

// ============================================================
// SECTION 3: CSS
// ============================================================

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=IM+Fell+English:ital@0;1&family=Cinzel:wght@400;700;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0e0b07;
    color: #ddd0b4;
    font-family: 'IM Fell English', Georgia, serif;
    min-height: 100vh;
    /* subtle paper grain */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  }

  .game-wrapper {
    max-width: 860px;
    margin: 0 auto;
    padding: 28px 32px 80px;
  }

  /* MAIN PANEL — double-rule newspaper border */
  .main-panel {
    background: #0a0804;
    border: 1px solid #3a2a14;
    box-shadow: inset 0 0 0 3px #0a0804, inset 0 0 0 4px #2a1e0e;
    overflow: hidden;
    margin-bottom: 20px;
    --accent: #C17700;
  }

  .panel-accent { height: 6px; }

  .panel-inner { padding: 26px 32px; }

  /* METERS */
  .meters {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid #2a1e0e;
  }

  .meter-item { display: flex; flex-direction: column; gap: 6px; }

  .meter-label {
    font-family: 'Cinzel', serif;
    font-size: 8px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #7a6a4a;
  }

  .meter-bar-bg {
    height: 6px;
    background: #1a1208;
    border-radius: 0;
    overflow: hidden;
  }

  .meter-bar-fill {
    height: 100%;
    border-radius: 0;
    transition: width 0.7s cubic-bezier(.4,0,.2,1);
  }

  .meter-value {
    font-family: 'Cinzel', serif;
    font-size: 12px;
    font-weight: 700;
    color: #c0a870;
    font-variant-numeric: tabular-nums;
  }

  /* TYPOGRAPHY */
  h1.game-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(2.6rem, 8vw, 5rem);
    font-weight: 900;
    line-height: 1.0;
    color: #f0e0b8;
    letter-spacing: 0.04em;
    text-shadow: 0 2px 12px rgba(0,0,0,0.8);
  }

  h2.screen-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    font-weight: 700;
    color: #f0e0b8;
    line-height: 1.2;
    margin-bottom: 16px;
    text-shadow: 0 1px 4px rgba(0,0,0,0.6);
  }

  .eyebrow {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent, #C17700);
    margin-bottom: 10px;
    display: block;
    opacity: 0.9;
  }

  p.body-text {
    font-size: 17px;
    line-height: 1.85;
    color: #ccc0a0;
    margin-bottom: 16px;
  }

  /* newspaper-style quote block with large decorative mark */
  .quote-block {
    border-top: 2px solid var(--accent, #C17700);
    border-bottom: 1px solid #2a1e0e;
    padding: 18px 24px 14px;
    margin: 24px 0;
    background: rgba(193,119,0,0.04);
    position: relative;
  }

  .quote-block::before {
    content: '\\201C';
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 72px;
    color: var(--accent, #C17700);
    opacity: 0.25;
    position: absolute;
    top: -8px;
    left: 16px;
    line-height: 1;
  }

  .quote-text {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic;
    font-size: 18px;
    line-height: 1.65;
    color: #e0d0a8;
    margin-bottom: 8px;
    padding-left: 8px;
  }

  .quote-source {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    color: #7a6a4a;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* BUTTONS */
  .btn {
    display: inline-block;
    padding: 13px 30px;
    border: none;
    border-radius: 0;
    font-family: 'Cinzel', serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.1s;
    text-transform: uppercase;
  }

  .btn:hover { opacity: 0.82; transform: translateY(-1px); }
  .btn:active { transform: none; }

  .btn-primary { background: var(--accent, #C17700); color: #fff; }
  .btn-secondary { background: #120f08; color: #a08860; border: 1px solid #2e2214; }
  .btn-outline { background: transparent; color: var(--accent, #C17700); border: 2px solid var(--accent, #C17700); }

  /* CHOICE CARDS */
  .choice-card {
    border: 1px solid #2a1e0e;
    border-left: 3px solid #2a1e0e;
    padding: 16px 20px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    background: #080603;
  }

  .choice-card:hover { border-left-color: var(--accent, #C17700); border-color: var(--accent, #C17700); background: #100d07; }
  .choice-card.selected { border-left-color: var(--accent, #C17700); border-color: var(--accent, #C17700); background: #100d07; opacity: 0.65; cursor: default; }

  .choice-label {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent, #C17700);
    margin-bottom: 6px;
    font-weight: 700;
  }

  .choice-text { font-size: 16px; line-height: 1.75; color: #c8b898; }

  /* HINGE */
  .hinge-option {
    border: 1px solid #2a1e0e;
    border-left: 3px solid #2a1e0e;
    padding: 15px 18px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: border-color 0.2s;
    font-size: 16px;
    line-height: 1.65;
    color: #c8b898;
    background: #080603;
  }

  .hinge-option:hover:not(.disabled) { border-left-color: var(--accent, #C17700); border-color: var(--accent, #C17700); }
  .hinge-option.correct { border-color: #3a7a3a; border-left-color: #5aaa5a; background: rgba(58,122,58,0.08); color: #8acc8a; }
  .hinge-option.incorrect { border-color: #7a3a3a; border-left-color: #aa5a5a; background: rgba(122,58,58,0.08); color: #cc8a8a; }
  .hinge-option.disabled { cursor: default; }

  .hinge-explanation {
    background: #060402;
    border: 1px solid #2a1e0e;
    border-top: 2px solid var(--accent, #C17700);
    padding: 20px 22px;
    margin-top: 16px;
  }

  .skill-tag {
    display: inline-block;
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent, #C17700);
    border: 1px solid var(--accent, #C17700);
    padding: 3px 10px;
    margin-bottom: 12px;
  }

  /* CHAPTER HUB */
  .chapter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
    margin-top: 20px;
  }

  .chapter-card {
    border: 1px solid #2a1e0e;
    border-top: 3px solid #2a1e0e;
    padding: 16px 18px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    background: #080603;
  }

  .chapter-card:hover:not(.locked) { border-top-color: var(--accent, #C17700); border-color: var(--accent, #C17700); background: #100d07; }
  .chapter-card.locked { opacity: 0.3; cursor: not-allowed; }
  .chapter-card.complete { border-top-color: #3a5a3a; border-color: #2a3a2a; }

  .chapter-num { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: #5a4a2a; margin-bottom: 5px; }
  .chapter-name { font-family: 'Playfair Display', Georgia, serif; font-size: 16px; font-weight: 700; color: #e0d0a8; margin-bottom: 4px; }
  .chapter-sub { font-size: 12px; color: #7a6a4a; font-style: italic; }
  .chapter-status { font-family: 'Cinzel', serif; font-size: 9px; margin-top: 8px; color: #5a8a5a; letter-spacing: 0.08em; }

  /* VERDICT */
  .verdict-box {
    border: 1px solid var(--accent, #C17700);
    border-top: 4px solid var(--accent, #C17700);
    padding: 24px;
    margin-top: 24px;
    background: rgba(0,0,0,0.3);
  }

  .verdict-title {
    font-family: 'Cinzel', Georgia, serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--accent, #C17700);
    margin-bottom: 6px;
    letter-spacing: 0.06em;
  }

  /* CRISIS */
  .crisis-screen { text-align: center; padding: 56px 20px; }

  .crisis-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(2rem, 8vw, 4.8rem);
    font-weight: 900;
    letter-spacing: 0.08em;
    color: var(--accent, #C17700);
    text-shadow: 0 0 60px var(--accent, #C17700), 0 0 20px rgba(0,0,0,0.9);
    margin-bottom: 28px;
    animation: flicker 2.5s ease-in-out infinite;
    text-transform: uppercase;
  }

  @keyframes flicker {
    0%, 100% { opacity: 1; }
    45% { opacity: 0.92; }
    50% { opacity: 0.72; }
    55% { opacity: 0.97; }
  }

  /* PROGRESS PIPS */
  .progress-row { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }

  .progress-pip { width: 8px; height: 8px; border-radius: 50%; background: #2a1e0e; }
  .progress-pip.done { background: var(--accent, #C17700); }
  .progress-pip.current { background: var(--accent, #C17700); box-shadow: 0 0 8px var(--accent, #C17700); }

  /* METER DELTA TAGS */
  .delta-row { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; }

  .delta { font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; padding: 3px 10px; letter-spacing: 0.06em; }
  .delta.pos { background: rgba(44,110,73,0.15); color: #7acc8a; border: 1px solid rgba(44,110,73,0.3); }
  .delta.neg { background: rgba(139,26,26,0.15); color: #cc8a7a; border: 1px solid rgba(139,26,26,0.3); }

  /* DIVIDER — newspaper rule */
  hr.divider {
    border: none;
    border-top: 1px solid #2a1e0e;
    margin: 22px 0;
    position: relative;
  }

  /* ROLE TAG */
  .role-tag {
    display: inline-block;
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 0.1em;
    color: #9a8a6a;
    background: #080603;
    border: 1px solid #2a1e0e;
    padding: 5px 14px;
    margin-bottom: 18px;
    text-transform: uppercase;
  }

  /* RESPONSIVE — laptop */
  @media (max-width: 900px) {
    .game-wrapper { padding: 20px 24px 60px; }
    .panel-inner { padding: 22px 24px; }
  }

  /* RESPONSIVE — tablet/phone */
  @media (max-width: 600px) {
    .game-wrapper { padding: 14px 14px 60px; }
    .panel-inner { padding: 16px 16px; }
    .meters { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .chapter-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
    p.body-text { font-size: 16px; }
    .choice-text { font-size: 15px; }
    .hinge-option { font-size: 15px; }
    .quote-text { font-size: 16px; }
    h2.screen-title { font-size: clamp(1.3rem, 5vw, 1.8rem); }
  }

  @media (max-width: 400px) {
    .chapter-grid { grid-template-columns: 1fr; }
    .game-wrapper { padding: 10px 10px 50px; }
  }
`;

// ============================================================
// SECTION 4: COMPONENTS
// ============================================================

function MainPanel({ meters, accent, children }) {
  return (
    <div className="main-panel" style={{ '--accent': accent }}>
      <div className="panel-accent" style={{ background: accent }} />
      <div className="panel-inner">
        <div className="meters">
          {METER_CONFIG.map(m => (
            <div key={m.key} className="meter-item">
              <span className="meter-label">{m.label}</span>
              <div className="meter-bar-bg">
                <div className="meter-bar-fill" style={{
                  width: `${Math.max(0, Math.min(100, meters[m.key]))}%`,
                  background: m.color
                }} />
              </div>
              <span className="meter-value">{Math.round(meters[m.key])}</span>
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}

function clampMeters(m) {
  const out = {};
  Object.keys(m).forEach(k => { out[k] = Math.max(0, Math.min(100, m[k])); });
  return out;
}

function applyDeltas(meters, deltas) {
  const out = { ...meters };
  Object.entries(deltas).forEach(([k, v]) => { out[k] = (out[k] || 0) + v; });
  return clampMeters(out);
}

function DeltaTags({ deltas }) {
  return (
    <div className="delta-row">
      {METER_CONFIG.map(m => {
        const v = deltas[m.key];
        if (!v) return null;
        return (
          <span key={m.key} className={`delta ${v > 0 ? 'pos' : 'neg'}`}>
            {m.label} {v > 0 ? '+' : ''}{v}
          </span>
        );
      })}
    </div>
  );
}

function ProgressPips({ total, current }) {
  return (
    <div className="progress-row">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`progress-pip ${i < current ? 'done' : i === current ? 'current' : ''}`} />
      ))}
    </div>
  );
}

// ── TITLE SCREEN ──────────────────────────────────────────
function TitleScreen({ onStart, onResume, hasSave }) {
  return (
    <div style={{ '--accent': '#C17700', textAlign: 'center', padding: '60px 20px 40px' }}>
      <span className="eyebrow">US History & Government · 11R · Regents Aligned</span>
      <h1 className="game-title" style={{ fontSize: 'clamp(3rem, 12vw, 6rem)', color: '#C17700' }}>1900</h1>
      <h1 className="game-title" style={{ fontSize: 'clamp(1.4rem, 5vw, 2.4rem)', fontWeight: 400, fontStyle: 'italic', marginTop: 4, marginBottom: 28 }}>
        A Nation in Reform
      </h1>
      <p className="body-text" style={{ maxWidth: 500, margin: '0 auto 32px', color: '#7a6a52', fontSize: 14 }}>
        Seven chapters. Seven roles — a factory worker, a journalist, a president, a union organizer, a suffragist, a reformer, a civil rights leader. One question: <em style={{ color: '#a09070' }}>who does progress belong to?</em>
      </p>
      <p className="body-text" style={{ maxWidth: 500, margin: '0 auto 36px', fontSize: 13, color: '#5a4a38' }}>
        Regents Standards: 11.5a · 11.5b · 11.5c
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={onStart} style={{ '--accent': '#C17700', background: '#C17700' }}>
          {hasSave ? 'New Game' : 'Begin'}
        </button>
        {hasSave && (
          <button className="btn btn-outline" onClick={onResume} style={{ '--accent': '#C17700' }}>
            Resume
          </button>
        )}
      </div>
    </div>
  );
}

// ── HOW TO PLAY ───────────────────────────────────────────
function HowToPlay({ onContinue }) {
  const items = [
    ['Your Role', 'Each chapter places you inside a specific historical actor — not an observer. Your decisions are their decisions.'],
    ['The Gauges', 'Four forces shape the Progressive Era: Corporate Power, Labor Unrest, Reform Pressure, and Political Will. Your choices shift all four.'],
    ['No Right Answers', 'Every decision involves real trade-offs. The most historically accurate choice is not always the most morally comfortable one.'],
    ['Regents Hinge', 'Each chapter closes with a Regents-style analytical question. Full explanations are provided regardless of your answer.'],
    ['Your Verdict', 'After all seven chapters, your accumulated choices determine which version of the Progressive Era you built — or failed to build.'],
  ];
  return (
    <div style={{ '--accent': '#C17700' }}>
      <span className="eyebrow">How to Play</span>
      <h2 className="screen-title">Before You Begin</h2>
      {items.map(([title, desc]) => (
        <div key={title} style={{ marginBottom: 16, paddingLeft: 14, borderLeft: '2px solid #2e2214' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#C17700', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{title}</div>
          <p className="body-text" style={{ marginBottom: 0, fontSize: 14 }}>{desc}</p>
        </div>
      ))}
      <div style={{ marginTop: 24 }}>
        <button className="btn btn-primary" onClick={onContinue} style={{ '--accent': '#C17700', background: '#C17700' }}>Enter the Era</button>
      </div>
    </div>
  );
}

// ── CHAPTER HUB ──────────────────────────────────────────
function ChapterHub({ completed, onSelect, meters, onShowVerdict }) {
  const allDone = completed.length >= CHAPTERS.length;
  const verdict = getVerdict(meters);
  return (
    <div style={{ '--accent': '#C17700' }}>
      <span className="eyebrow">Chapter Select</span>
      <h2 className="screen-title">1900: A Nation in Reform</h2>
      {allDone && (
        <div className="verdict-box" style={{ '--accent': verdict.color }}>
          <div className="verdict-title">{verdict.title}</div>
          <div style={{ fontSize: 12, color: '#7a6a52', marginBottom: 10, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{verdict.subtitle}</div>
          <p className="body-text" style={{ fontSize: 14, marginBottom: 14 }}>{verdict.description}</p>
          <button className="btn btn-outline" onClick={onShowVerdict} style={{ '--accent': verdict.color }}>Full Verdict</button>
        </div>
      )}
      <div className="chapter-grid">
        {ALL_CHAPTER_META.map((meta, i) => {
          const isDone = completed.includes(meta.id);
          const isAvailable = meta.id === 1 || completed.includes(meta.id - 1);
          const isLocked = !isAvailable;
          const accent = CHAPTERS[i]?.accentColor || '#C17700';
          return (
            <div
              key={meta.id}
              className={`chapter-card ${isLocked ? 'locked' : ''} ${isDone ? 'complete' : ''}`}
              style={{ '--accent': accent, borderColor: isDone ? accent + '44' : undefined }}
              onClick={() => !isLocked && onSelect(meta.id)}
            >
              <div className="chapter-num">Chapter {meta.id} {isDone ? '✓' : isLocked ? '🔒' : ''}</div>
              <div className="chapter-name">{meta.title}</div>
              <div className="chapter-sub">{meta.subtitle}</div>
              {isDone && <div className="chapter-status">Complete — Replay available</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── CHAPTER INTRO ─────────────────────────────────────────
function ChapterIntro({ chapter, onContinue }) {
  const { accentColor: accent } = chapter;
  return (
    <div style={{ '--accent': accent }}>
      <span className="eyebrow">Chapter {chapter.id} of {CHAPTERS.length}</span>
      <h2 className="screen-title">{chapter.title}</h2>
      <div className="role-tag">Your Role: {chapter.role}</div>
      <div className="quote-block">
        <div className="quote-text">{chapter.quote}</div>
        <div className="quote-source">— {chapter.quoteSource}</div>
      </div>
      <p className="body-text" style={{ color: '#7a6a52', fontSize: 13 }}>
        <strong style={{ color: '#9a8a6a' }}>Sourcing note:</strong> Consider the context and purpose of this quote as you play. Who said it, and why? What does it reveal about the historical moment?
      </p>
      <button className="btn btn-primary" onClick={onContinue}>Read Historical Context →</button>
    </div>
  );
}

// ── CHAPTER CONTEXT ───────────────────────────────────────
function ChapterContext({ chapter, page, onNext, onBegin }) {
  const { accentColor: accent, context } = chapter;
  const isLast = page >= context.length - 1;
  return (
    <div style={{ '--accent': accent }}>
      <span className="eyebrow">Historical Context · {page + 1} of {context.length}</span>
      <h2 className="screen-title">{chapter.title}</h2>
      <ProgressPips total={context.length} current={page + 1} />
      <p className="body-text">{context[page]}</p>
      <div style={{ marginTop: 20 }}>
        {isLast ? (
          <button className="btn btn-primary" onClick={onBegin}>Make Your First Decision →</button>
        ) : (
          <button className="btn btn-secondary" onClick={onNext}>Continue →</button>
        )}
      </div>
    </div>
  );
}

// ── DECISION SCREEN ───────────────────────────────────────
function DecisionScreen({ chapter, decisionIndex, selected, onSelect }) {
  const { accentColor: accent, decisions } = chapter;
  const dec = decisions[decisionIndex];
  return (
    <div style={{ '--accent': accent }}>
      <span className="eyebrow">Decision {decisionIndex + 1} of 3 · {dec.year}</span>
      <ProgressPips total={3} current={decisionIndex} />
      <p className="body-text">{dec.situation}</p>
      <hr className="divider" />
      <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7a6a52', marginBottom: 14 }}>{dec.question}</p>
      {dec.options.map(opt => (
        <div
          key={opt.label}
          className={`choice-card ${selected === opt.label ? 'selected' : ''}`}
          onClick={() => !selected && onSelect(opt.label)}
        >
          <div className="choice-label">Option {opt.label}</div>
          <div className="choice-text">{opt.text}</div>
        </div>
      ))}
    </div>
  );
}

// ── CONSEQUENCE SCREEN ────────────────────────────────────
function ConsequenceScreen({ chapter, decisionIndex, choiceLabel, onContinue }) {
  const { accentColor: accent, decisions } = chapter;
  const dec = decisions[decisionIndex];
  const opt = dec.options.find(o => o.label === choiceLabel);
  const isLast = decisionIndex >= 2;
  return (
    <div style={{ '--accent': accent }}>
      <span className="eyebrow">Consequence · Decision {decisionIndex + 1}</span>
      <h2 className="screen-title">What Happens Next</h2>
      <div className="quote-block">
        <div className="quote-text" style={{ fontStyle: 'normal', fontSize: 14 }}>{opt.consequence}</div>
      </div>
      <DeltaTags deltas={opt.meters} />
      <div style={{ marginTop: 24 }}>
        <button className="btn btn-primary" onClick={onContinue}>
          {isLast ? 'Regents Question →' : `Decision ${decisionIndex + 2} →`}
        </button>
      </div>
    </div>
  );
}

// ── CRISIS SCREEN ─────────────────────────────────────────
function CrisisScreen({ chapter, onContinue }) {
  const { accentColor: accent } = chapter;
  return (
    <div className="crisis-screen" style={{ '--accent': accent }}>
      <div className="crisis-title">{chapter.crisisTitle}</div>
      <p className="body-text" style={{ maxWidth: 560, margin: '0 auto 30px', fontSize: 15 }}>
        {chapter.crisisText}
      </p>
      <button className="btn btn-outline" onClick={onContinue}>Continue →</button>
    </div>
  );
}

// ── HINGE SCREEN ──────────────────────────────────────────
function HingeScreen({ chapter, answer, onAnswer, onContinue }) {
  const { accentColor: accent, hingeQuestion: hq } = chapter;
  const answered = answer !== null;
  return (
    <div style={{ '--accent': accent }}>
      <span className="eyebrow">Regents Hinge Question</span>
      <span className="skill-tag">{hq.regentsSkill}</span>
      <h2 className="screen-title" style={{ fontSize: '1.15rem', marginBottom: 18 }}>{hq.question}</h2>
      {hq.options.map((opt, i) => {
        let cls = 'hinge-option';
        if (answered) {
          cls += ' disabled';
          if (i === hq.correctIndex) cls += ' correct';
          else if (i === answer) cls += ' incorrect';
        }
        return (
          <div key={i} className={cls} onClick={() => !answered && onAnswer(i)}>
            <strong style={{ marginRight: 8, opacity: 0.6 }}>{String.fromCharCode(65 + i)}.</strong>{opt}
          </div>
        );
      })}
      {answered && (
        <div className="hinge-explanation">
          <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: answer === hq.correctIndex ? '#4a8a4a' : '#8a4a4a', marginBottom: 8, fontWeight: 700 }}>
            {answer === hq.correctIndex ? '✓ Correct' : '✗ Review'}
          </div>
          <p className="body-text" style={{ fontSize: 14, marginBottom: 0 }}>{hq.explanation}</p>
          <div style={{ marginTop: 18 }}>
            <button className="btn btn-primary" onClick={onContinue}>Complete Chapter →</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── CHAPTER END ───────────────────────────────────────────
function ChapterEnd({ chapter, meters, onHub }) {
  const verdict = getVerdict(meters);
  return (
    <div style={{ '--accent': chapter.accentColor }}>
      <span className="eyebrow">Chapter {chapter.id} Complete</span>
      <h2 className="screen-title">{chapter.title}</h2>
      <p className="body-text">You have played through {chapter.years}. Your decisions have shifted the forces that will shape the next chapter.</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
        <button className="btn btn-primary" onClick={onHub}>
          {chapter.id < CHAPTERS.length ? 'Next Chapter →' : 'Final Verdict →'}
        </button>
      </div>
    </div>
  );
}

// ── FULL VERDICT ──────────────────────────────────────────
function VerdictScreen({ meters, onHub }) {
  const v = getVerdict(meters);
  return (
    <div style={{ '--accent': v.color }}>
      <span className="eyebrow">Final Verdict · All Chapters Complete</span>
      <h2 className="screen-title">{v.title}</h2>
      <div className="role-tag" style={{ borderColor: v.color, color: v.color }}>{v.subtitle}</div>
      <p className="body-text">{v.description}</p>
      <hr className="divider" />
      <div style={{ marginBottom: 16 }}>
        <span className="eyebrow">Your Final Gauges</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginTop: 10 }}>
          {METER_CONFIG.map(m => (
            <div key={m.key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: '#8a7a5a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#c0b098' }}>{Math.round(meters[m.key])}</span>
              </div>
              <div className="meter-bar-bg" style={{ height: 8 }}>
                <div className="meter-bar-fill" style={{
                  width: `${meters[m.key]}%`,
                  background: m.color
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="divider" />
      <p className="body-text" style={{ fontSize: 13, color: '#6a5a42' }}>
        Use the reflection journal to connect these outcomes to the Regents standards. Play again to explore how different choices shape different historical outcomes.
      </p>
      <button className="btn btn-secondary" onClick={onHub} style={{ marginTop: 8 }}>Back to Chapter Select</button>
    </div>
  );
}

// ============================================================
// SECTION 5: APP CONTROLLER
// ============================================================

export default function App() {
  const [screen, setScreen]               = useState('title');
  const [meters, setMeters]               = useState(INIT_METERS);
  const [completed, setCompleted]         = useState([]);
  const [chapterId, setChapterId]         = useState(null);
  const [decisionIdx, setDecisionIdx]     = useState(0);
  const [contextPage, setContextPage]     = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [hingeAnswer, setHingeAnswer]     = useState(null);
  const [showCrisis, setShowCrisis]       = useState(false);
  const [allChoices, setAllChoices]       = useState({});

  const chapter = CHAPTERS.find(c => c.id === chapterId) || null;
  const accentColor = chapter?.accentColor || '#C17700';

  // ── SAVE / LOAD ──────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.meters) setMeters(s.meters);
        if (s.completed) setCompleted(s.completed);
        if (s.allChoices) setAllChoices(s.allChoices);
      } catch {}
    }
  }, []);

  function saveGame(newMeters, newCompleted, newChoices) {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      meters: newMeters,
      completed: newCompleted,
      allChoices: newChoices
    }));
  }

  function clearSave() {
    localStorage.removeItem(SAVE_KEY);
  }

  const hasSave = !!localStorage.getItem(SAVE_KEY);

  // ── NAVIGATION ───────────────────────────────────────────
  function startNewGame() {
    clearSave();
    setMeters(INIT_METERS);
    setCompleted([]);
    setAllChoices({});
    setScreen('howtoplay');
  }

  function resumeGame() { setScreen('hub'); }

  function selectChapter(id) {
    setChapterId(id);
    setDecisionIdx(0);
    setContextPage(0);
    setSelectedChoice(null);
    setHingeAnswer(null);
    setShowCrisis(false);
    setScreen('chapterIntro');
  }

  function handleChoiceSelect(label) {
    setSelectedChoice(label);
    const ch = CHAPTERS.find(c => c.id === chapterId);
    const dec = ch.decisions[decisionIdx];
    const opt = dec.options.find(o => o.label === label);
    const newMeters = applyDeltas(meters, opt.meters);
    setMeters(newMeters);

    const newChoices = {
      ...allChoices,
      [chapterId]: [...(allChoices[chapterId] || []), label]
    };
    setAllChoices(newChoices);
    saveGame(newMeters, completed, newChoices);

    setTimeout(() => setScreen('consequence'), 300);
  }

  function afterConsequence() {
    const ch = CHAPTERS.find(c => c.id === chapterId);
    const isLastDecision = decisionIdx >= 2;

    if (isLastDecision) {
      // Check for crisis
      const shouldCrisis = ch.isCrisisChapter ||
        (ch.crisisTitle && meters.labor > 55 && ch.id === 1);
      if (shouldCrisis && !showCrisis) {
        setShowCrisis(true);
        setScreen('crisis');
      } else {
        setScreen('hinge');
      }
    } else {
      setDecisionIdx(prev => prev + 1);
      setSelectedChoice(null);
      setScreen('decision');
    }
  }

  function afterCrisis() {
    setScreen('hinge');
  }

  function afterHinge() {
    const ch = CHAPTERS.find(c => c.id === chapterId);
    const newCompleted = completed.includes(ch.id) ? completed : [...completed, ch.id];
    setCompleted(newCompleted);
    saveGame(meters, newCompleted, allChoices);
    setScreen('chapterEnd');
  }

  // ── RENDER ───────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
      <div className="game-wrapper">
        {/* TITLE */}
        {screen === 'title' && (
          <TitleScreen onStart={startNewGame} onResume={resumeGame} hasSave={hasSave} />
        )}

        {/* HOW TO PLAY */}
        {screen === 'howtoplay' && (
          <MainPanel meters={meters} accent="#C17700">
            <HowToPlay onContinue={() => setScreen('hub')} />
          </MainPanel>
        )}

        {/* HUB */}
        {screen === 'hub' && (
          <MainPanel meters={meters} accent="#C17700">
            <ChapterHub
              completed={completed}
              onSelect={selectChapter}
              meters={meters}
              onShowVerdict={() => setScreen('verdict')}
            />
          </MainPanel>
        )}

        {/* CHAPTER INTRO */}
        {screen === 'chapterIntro' && chapter && (
          <MainPanel meters={meters} accent={accentColor}>
            <ChapterIntro chapter={chapter} onContinue={() => setScreen('chapterContext')} />
          </MainPanel>
        )}

        {/* CONTEXT */}
        {screen === 'chapterContext' && chapter && (
          <MainPanel meters={meters} accent={accentColor}>
            <ChapterContext
              chapter={chapter}
              page={contextPage}
              onNext={() => setContextPage(p => p + 1)}
              onBegin={() => { setContextPage(0); setScreen('decision'); }}
            />
          </MainPanel>
        )}

        {/* DECISION */}
        {screen === 'decision' && chapter && (
          <MainPanel meters={meters} accent={accentColor}>
            <DecisionScreen
              chapter={chapter}
              decisionIndex={decisionIdx}
              selected={selectedChoice}
              onSelect={handleChoiceSelect}
            />
          </MainPanel>
        )}

        {/* CONSEQUENCE */}
        {screen === 'consequence' && chapter && selectedChoice && (
          <MainPanel meters={meters} accent={accentColor}>
            <ConsequenceScreen
              chapter={chapter}
              decisionIndex={decisionIdx}
              choiceLabel={selectedChoice}
              onContinue={afterConsequence}
            />
          </MainPanel>
        )}

        {/* CRISIS */}
        {screen === 'crisis' && chapter && (
          <MainPanel meters={meters} accent={accentColor}>
            <CrisisScreen chapter={chapter} onContinue={afterCrisis} />
          </MainPanel>
        )}

        {/* HINGE */}
        {screen === 'hinge' && chapter && (
          <MainPanel meters={meters} accent={accentColor}>
            <HingeScreen
              chapter={chapter}
              answer={hingeAnswer}
              onAnswer={a => { setHingeAnswer(a); }}
              onContinue={afterHinge}
            />
          </MainPanel>
        )}

        {/* CHAPTER END */}
        {screen === 'chapterEnd' && chapter && (
          <MainPanel meters={meters} accent={accentColor}>
            <ChapterEnd chapter={chapter} meters={meters} onHub={() => setScreen('hub')} />
          </MainPanel>
        )}

        {/* VERDICT */}
        {screen === 'verdict' && (
          <MainPanel meters={meters} accent={getVerdict(meters).color}>
            <VerdictScreen meters={meters} onHub={() => setScreen('hub')} />
          </MainPanel>
        )}
      </div>
    </>
  );
}
