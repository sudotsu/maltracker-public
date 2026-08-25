import { FigureBlock } from "@/components/figure-block";
import { Section } from "@/components/section";
import { incident, siteCounts } from "@/data/incident";
import { publicSite } from "@/data/public-site";

const number = new Intl.NumberFormat("en-US");

function format(value: number) {
  return number.format(value);
}

export function SectionOne() {
  const { figures } = incident;

  return (
    <section className="section hero" aria-labelledby="story-title">
      <div className="hero-kicker">
        <span>Public incident case study</span>
        <span>Reviewed {incident.lastReviewed}</span>
      </div>
      <p className="eyebrow">01 · What it was</p>
      <h1 id="story-title">One account, seventeen websites.</h1>
      <p className="standfirst">
        A long-running web development company had kept every client site together in one
        hosting account. One break-in could reach all of them.
      </p>
      <p className="identity-note">
        This is an anonymized account of a real incident involving real companies and real
        money. Direct identifiers and sensitive infrastructure details have been removed.
      </p>
      <div className="figure-grid figure-grid-two" role="group" aria-label="Incident scale">
        <FigureBlock
          value={format(figures.sitesOnOneAccount)}
          label="client sites shared one account"
        />
        <FigureBlock
          value="Decades"
          label="in business before the incident"
          sub="A long history did not make the setup safe."
        />
      </div>
      <p className="prose lead">
        The sites lived in one directory tree. Anything able to write to one site could write
        to every other site beside it. The account boundary that should have contained one
        failure did not exist.
      </p>
    </section>
  );
}

export function SectionTwo() {
  const { figures } = incident;

  return (
    <Section eyebrow="02 · What was happening" title="The spam was the decoy.">
      <p className="prose lead">
        Casino pages were the visible mess. Underneath, the account had become a machine for
        finding database passwords belonging to other customers of the same hosting company.
      </p>
      <div className="figure-grid figure-grid-feature" role="group" aria-label="Attack scale">
        <FigureBlock
          value={format(figures.otherAccountsTargeted)}
          label="other customer accounts targeted"
        />
        <FigureBlock
          value={format(figures.maliciousLinksLive)}
          label="malicious links"
        />
        <FigureBlock
          value={format(figures.droppersLive)}
          label="files built to install more malware"
        />
        <FigureBlock
          value={format(figures.backdoors)}
          label="hidden ways back in reported by the scanner"
        />
      </div>
      <aside className="plain-callout">
        <span className="callout-label">The important part</span>
        <p>
          This was not one damaged website. One customer’s account was being used to reach
          more than a thousand unrelated businesses on the same shared system.
        </p>
      </aside>
    </Section>
  );
}

export function SectionThree() {
  const { figures } = incident;

  return (
    <Section eyebrow="03 · Why cleanup failed" title="It rebuilt faster than anyone could delete.">
      <p className="prose lead">
        Two snapshots, taken {figures.doublingWindowHours} hours apart, showed the footprint
        growing while the response was already under way.
      </p>
      <div className="comparison" role="group" aria-label="Growth over 28 hours">
        <div className="comparison-row">
          <span>Malicious links</span>
          <strong>{format(figures.maliciousLinksAtArchive)}</strong>
          <span aria-hidden="true">→</span>
          <strong>{format(figures.maliciousLinksLive)}</strong>
        </div>
        <div className="comparison-row">
          <span>Installer files</span>
          <strong>{format(figures.droppersAtArchive)}</strong>
          <span aria-hidden="true">→</span>
          <strong>{format(figures.droppersLive)}</strong>
        </div>
      </div>
      <div className="figure-grid figure-grid-two">
        <FigureBlock
          value={format(figures.backdoorsPresentInArchive)}
          label={`of the ${format(figures.backdoors)} reported backdoors existed in the earlier snapshot`}
        />
        <FigureBlock
          value={`${format(figures.doublingWindowHours)} hours`}
          label="for all of them to appear"
        />
      </div>
      <p className="verdict">You cannot enumerate your way out of a system that rebuilds itself.</p>
    </Section>
  );
}

export function SectionFour() {
  const { figures } = incident;

  return (
    <Section eyebrow="04 · The eviction" title="One line stopped it.">
      <div className="split-intro">
        <p className="prose lead">
          One account-wide rule denied the web server permission to run program files. Every
          confirmed active attacker request depended on code running through that server, so
          the rule stopped the observed execution route immediately.
        </p>
        <FigureBlock
          value={format(figures.successfulAttackerRequestsInOneDay)}
          label="successful attacker requests on the final day"
          sub="Then zero after execution was denied."
        />
      </div>
      <p className="prose">
        Known hosting passwords and control-panel credentials were rotated, and the account’s
        SSH and FTP access paths were removed in the same window. Nothing on the old server was
        deleted. The malicious files stayed in place as inert evidence.
      </p>
      <ol className="timeline" aria-label="Incident timeline">
        {incident.timeline.map((event) => (
          <li key={event.when}>
            <time>{event.when}</time>
            <span>{event.what}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function SectionFive() {
  const { figures } = incident;

  return (
    <Section eyebrow="05 · The decision" title="What we chose not to do.">
      <p className="prose lead">
        We did not clean the old server. We did not accept a quote that treated each site as
        a separate cleanup while leaving the shared structure unchanged.
      </p>
      <div className="decision-grid">
        <article>
          <span className="decision-mark" aria-hidden="true">×</span>
          <h3>Clean in place</h3>
          <p>
            The attacker was still writing new files. A successful cleanup could be undone
            before anyone finished checking it.
          </p>
        </article>
        <article>
          <span className="decision-mark" aria-hidden="true">×</span>
          <h3>Pay {`$${format(figures.quotedCleanupPerSite)}`} per site</h3>
          <p>
            That removed symptoms without fixing why one break-in reached seventeen sites.
          </p>
        </article>
        <article className="decision-chosen">
          <span className="decision-mark" aria-hidden="true">✓</span>
          <h3>Rebuild with isolation</h3>
          <p>
            One account per client on the new host, for roughly $20 more each month. A future
            failure is contained to one client.
          </p>
        </article>
      </div>
    </Section>
  );
}

export function SectionSix() {
  const steps = [
    "Create an isolated account for one client only.",
    "Install the publishing platform fresh from its maker. Copy no program files from the compromised server.",
    "Copy content only: images, documents, and media. Leave executable and configuration files behind.",
    "Import the site’s database and clean it.",
    "Reinstall add-ons from their official sources.",
    "Compare every installed file with the maker’s published digital fingerprints.",
    "Run the automated pre-launch check. It must report CLEARED.",
    "Only then point the public address to the site and issue its security certificate.",
  ];

  return (
    <Section eyebrow="06 · The method" title="How each site was rebuilt.">
      <p className="prose lead">
        Content came from each site’s own database and media. Its program files never crossed
        the boundary into the new account.
      </p>
      <ol className="method-list">
        {steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function SectionSeven() {
  return (
    <Section eyebrow="07 · Three findings" title="The evidence changed the response.">
      <div className="findings">
        <article>
          <span className="finding-number">01</span>
          <div>
            <h3>The backdoor inside the database.</h3>
            <p>
              A stored instruction watched for a particular phrase in a new comment, then
              silently created a new administrator. Deleting files, reinstalling the
              platform, or removing the rogue account would not stop it. The instruction also
              travelled inside a database export.
            </p>
            <p>
              It was caught because the new database account was not allowed to create that
              kind of instruction. The import failed loudly instead of succeeding quietly.
              Five of thirteen exports carried it.
            </p>
          </div>
        </article>
        <article>
          <span className="finding-number">02</span>
          <div>
            <h3>Dating the damage to a 28-hour window.</h3>
            <p>
              Two database snapshots were compared marker by marker. Six of eight databases
              were clean in the earlier copy and defaced in the later one. The defacement had
              happened during the response, not at the original intrusion. Several repair
              jobs became straightforward restores from the earlier copies.
            </p>
          </div>
        </article>
        <article>
          <span className="finding-number">03</span>
          <div>
            <h3>Clean because empty.</h3>
            <p>
              One backup had been labelled as a copy from before a site was wiped. It had
              actually been taken afterward. It contained no malware because it contained
              almost nothing at all. Clean and intact are different properties; proving one
              says nothing about the other.
            </p>
          </div>
        </article>
      </div>
    </Section>
  );
}

export function SectionEight() {
  const counts = siteCounts();

  return (
    <Section eyebrow="08 · Current status" title="Where it stands.">
      <div className="scoreboard" role="group" aria-label="Rebuild totals">
        <div><strong>{counts.live}</strong><span>live</span></div>
        <div><strong>{counts.built}</strong><span>built</span></div>
        <div><strong>{counts.todo}</strong><span>to do</span></div>
      </div>
      <ul className="site-list">
        {incident.sites.map((site) => (
          <li key={site.id}>
            <span className={`status-dot status-${site.status}`} aria-hidden="true" />
            <strong>{site.id}</strong>
            <span className="status-label">{site.status === "todo" ? "to do" : site.status}</span>
            <span>{site.note}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function SectionNine() {
  return (
    <Section eyebrow="09 · Unfinished work" title="What is still open.">
      <ul className="open-list">
        <li>
          <span>Infrastructure</span>
          <p>
            Four live domains still depend on the legacy provider’s nameservers as a temporary
            bridge. Their delegations must move before that account can be closed.
          </p>
        </li>
        <li>
          <span>Email</span>
          <p>
            The migrated mail paths work. Remaining legacy mailboxes and forwarders still need
            a final business-owner audit before shutdown.
          </p>
        </li>
        <li>
          <span>Entry</span>
          <p>
            The original way in remains unproven. The logs needed to settle it are held by
            the hosting company.
          </p>
        </li>
        <li>
          <span>Evidence</span>
          <p>The master evidence archive still needs a second verified storage copy.</p>
        </li>
        <li>
          <span>Search</span>
          <p>
            Search ownership, attacker-submitted indexing, and removal status still need an
            account-side review.
          </p>
        </li>
      </ul>
      <p className="closing-note">
        Last reviewed <time>{incident.lastReviewed}</time>. This record will change when the
        evidence does.
      </p>
      <footer className="case-study-footer">
        <p>
          Containment, investigation, reconstruction, and this public account by{" "}
          <a href={publicSite.responder.url}>{publicSite.responder.name}</a>.
        </p>
        <nav className="case-study-links" aria-label="Case study links">
          <a href={publicSite.responder.url}>Contact the responder</a>
          <a href={publicSite.repositoryUrl}>Inspect the source</a>
        </nav>
      </footer>
    </Section>
  );
}
