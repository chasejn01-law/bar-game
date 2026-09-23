const promptWords = [
  {
    word: "Valid Contract Formation",
    definition:
      "Offer, acceptance, and consideration."
  },
  {
    word: "Offer",
    definition:
      "An objective manifestation of willingness to enter into an agreement by the offeror that creates a power of acceptance in the offeree. The terms of the offer must be sufficiently certain. At common law, the offer must contain all essential terms. Under the UCC, the only essential term is quantity."
  },
  {
    word: "Revocation",
    definition:
      "The general rule is offers are freely revocable. Revocation can be direct or indirect. An indirect revocation occurs when the offeree acquires reliable information that the offeror has taken definite action inconsistent with the offer, which in turn automatically revokes the offer."
  },
  {
    word: "Firm Offer Rule",
    definition:
      "An offer is irrevocable if the offeror is a merchant, who gives an assurance that the offer will remain open, and the assurance is contained in a signed writing. Cannot remain open longer than three months without consideration."
  },
  {
    word: "Option Contract",
    definition:
      "A promise to keep an offer open for a certain amount of time supported by consideration."
  },
  {
    word: "Part Performance",
    definition:
      "An offer that invites performance as a reasonable method of acceptance (i.e., a unilateral contract) makes the offer irrevocable upon partial performance. Mere preparation is not enough to make the offer irrevocable."
  },
  {
    word: "Promissory Estoppel",
    definition:
      "When an offeree detrimentally relies on an offer in some reasonable manner, that offer may be irrevocable."
  },
  {
    word: "Acceptance",
    definition:
      "An acceptance is an objective manifestatoin by the offeree to be bound by the terms of the offer. An acceptance may arise by communication or performance. An express acceptance may be made by word of mouth or in writing. An acceptance can also be inferred by conduct, for example, if one receives goods and makes use of them."
  },
  {
    word: "Valid Acceptance Elements",
    definition:
      "(1) Must be dispatched within a reasonable time and while offer is still in force, (2) must be unconditional, and (3) must be communicated to the offeror."
  },
  {
    word: "Non-Conforming Acceptance",
    definition:
      "Acceptance by performance creates a contract. If the performance deviates from the terms of the offer, a non-conforming acceptance creates a contract and a simultaneous breach. A non-conforming acceptance accompanied by a written explanation creates a counteroffer."
  },
  {
    word: "Consideration",
    definition:
      "Valuable consideration is evidenced by a bargained-for change in the legal position between the parties. Most courts conclude that consideration exists if there is a detriment to the promisee, irrespective of the benefit to the promisor. A promise for a promise (i.e., a bilateral contract) is sufficient consideration"
  },
  {
    word: "Pre-Existing Duty",
    definition:
      "A promise to perform a pre-existing duty does not qualify as consideration because the promisor is already bound to perform."
  },
  {
    word: "Mailbox Rule",
    definition:
      "Unless the offer states otherwise, an acceptance that is mailed within the allotted response time is effective when dispatched (not upon receipt). Revocations are effective upon receipt. The mailbox rule does not apply when a rejection is sent before an acceptance. In those cases, whichever is received first controls."
  },
  {
    word: "Mirror Image Rule",
    definition:
      "At common law, for an acceptance to form a conract, the acceptance must be a mirror image of the offer. Any deviation from the terms (i.e., new or additional terms) is considered a counteroffer and no contract is created."
  },
  {
    word: "Battle of Forms",
    definition:
      "When the terms of an offer and acceptance do not align under the UCC, it is considered a battle of forms. Where at least one party is not a merchant, the additional terms are treated as a mere proposal that must be separately accepted by the offeror to become part of the contract. Where both parties are merchants, a contract is created that includes the new or additional terms, unless: (1) the offeror rejects within a reasonable time, (2) the terms are a material alteration (i.e., causes surprise or hardship) or (3) the offer expressly required assent to the new terms."
  },
  {
    word: "Breaching Party's Remedy",
    definition:
      "A breaching party's remedy would be in quasi contract, quantum meruit (as much as deserved). A right to money imposed by law. Recovery not dependent on the existence of a contract."
  },
  {
    word: "Actionable Breach of Contract",
    definition:
      "For a breach of contract to be actionable, it must be material breach rather than a minor breach. Material breach occurs when there is a failure to substantially perform, i.e., where the non-breaching party is denied the benefit of their bargain. Where breach is minor, the non-breaching party is entitled to a set off in price but cannot refuse to perform or otherwise treat the contract as breached."
  },
  {
    word: "Substantial Performance",
    definition:
      "The standard that determines whether a breach is actionable (more lenient than the UCC's perfect tender rule). Applies to real property transactions, services, and multiple delivery sale of goods contracts."
  },
  {
    word: "Perfect Tender Rule",
    definition:
      "Single delivery contracts under the UCC require perfect performance. If goods or tender of delivery fail in any respect to conform to the contract, the buyer has the right to: (1) accept the goods, (2) reject the entire shipement or (3) accept part and reject part."
  },
  {
    word: "Expectation Damages",
    definition:
      "Intended to pur the plaintiff in a position economically equivalent to the position that party would have been in if the contract had been fully performed. Expectation damages = loss in value + other loss (consequential and incidental damages) - cost avoided - loss avoided."
  },
  {
    word: "Loss in Value",
    definition:
      "The difference between the performance that the nonbreaching party should have received under the contract and what was actually received, if anything."
  },
  {
    word: "Lost Volume Seller Rule",
    definition:
      "Applies when a seller has an unlimited supply of goods and makes profit per item. Although the seller can resell the goods at the same price as the original contract price, they lost the opportunity to sell them in the first instance when the buyer breached. The seller need only show that they could have supplied both the breaching purchaser and resale purchaser with the goods. The measure of lost price is the list price minus the cost to the manufacturer."
  },
  {
    word: "Restitution",
    definition:
      "Seeks to restore to a party the benefit conferred on the other party. When a plaintiff unjustly enriches the defendant, restitution generally allows plaintiff to recover the benefit conferred on the defendant (rather than the harm suffered by the plaintiff)"
  },
  {
    word: "Reliance Damages",
    definition:
      "The out-of-pocket expenses incurred by the nonbreaching party. Meant to put the party in the same position as if the contract were never formed."
  },
  {
    word: "Specific Performance",
    definition:
      "Where the court compels the defendant to perform. Available where there is no adequate remedy of law and money damages will not resolve the problem. Used as a remedy in real property contracts and contracts for unique goods."
  }
];

// ====================
// SPEECH RECOGNITION
// ====================

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let isListening = false;

function setupSpeechRecognition() {
  const micButton =
    document.getElementById("micButton");

  const responseText =
    document.getElementById("responseText");

  if (!micButton || !responseText) {
    return;
  }

  // Browser does not support speech recognition
  if (!SpeechRecognition) {
    micButton.disabled = true;
    micButton.title =
      "Speech recognition is not supported in this browser.";
    micButton.style.opacity = "0.5";
    return;
  }

  recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  // Stop when the user finishes speaking
  recognition.continuous = false;

  // Display speech while it is being recognized
  recognition.interimResults = true;

  let originalText = "";

  micButton.addEventListener("click", function() {

    // Clicking while listening stops recognition
    if (isListening) {
      recognition.stop();
      return;
    }

    originalText =
      responseText.value.trim();

    try {
      recognition.start();
    } catch (error) {
      console.log(
        "Speech recognition is already running."
      );
    }
  });

  recognition.addEventListener(
    "start",
    function() {
      isListening = true;

      micButton.classList.add("listening");

      micButton.textContent = "🛑";

      micButton.title =
        "Stop listening";
    }
  );

  recognition.addEventListener(
    "result",
    function(event) {
      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        transcript +=
          event.results[i][0].transcript;
      }

      if (originalText) {
        responseText.value =
          `${originalText} ${transcript}`.trim();
      } else {
        responseText.value =
          transcript.trim();
      }
    }
  );

  recognition.addEventListener(
    "end",
    function() {
      isListening = false;

      micButton.classList.remove(
        "listening"
      );

      micButton.textContent = "🎤";

      micButton.title =
        "Speak answer";

      responseText.focus();
    }
  );

  recognition.addEventListener(
    "error",
    function(event) {
      console.error(
        "Speech recognition error:",
        event.error
      );

      isListening = false;

      micButton.classList.remove(
        "listening"
      );

      micButton.textContent = "🎤";

      micButton.title =
        "Speak answer";
    }
  );
}


// ====================
// STOP SPEECH
// ====================

function stopSpeechRecognition() {
  if (recognition && isListening) {
    recognition.stop();
  }
}


// Start microphone support
setupSpeechRecognition();