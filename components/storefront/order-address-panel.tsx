import type { OrderAddressSummary } from "@/lib/supabase/orders";

interface OrderAddressPanelProps {
  title: string;
  description: string;
  address: OrderAddressSummary;
}

function getAddressLines(address: OrderAddressSummary) {
  return [
    address.line1,
    address.line2,
    [address.city, address.state].filter(Boolean).join(", ") || null,
    [address.postalCode, address.country].filter(Boolean).join(" ") || null,
  ].filter(Boolean);
}

function hasAddressContent(address: OrderAddressSummary) {
  return Boolean(
    address.name ||
      address.email ||
      address.phone ||
      address.line1 ||
      address.line2 ||
      address.city ||
      address.state ||
      address.postalCode ||
      address.country,
  );
}

export function OrderAddressPanel({
  title,
  description,
  address,
}: OrderAddressPanelProps) {
  const addressLines = getAddressLines(address);
  const visible = hasAddressContent(address);

  return (
    <section className="luxury-muted-panel p-5">
      <p className="eyebrow">{title}</p>
      <p className="mt-3 text-sm leading-7 text-white/50">{description}</p>

      {visible ? (
        <div className="mt-5 space-y-3 text-sm text-white/64">
          {address.name ? <p className="text-white/78">{address.name}</p> : null}
          {address.email ? <p>{address.email}</p> : null}
          {address.phone ? <p>{address.phone}</p> : null}
          {addressLines.map((line, index) => (
            <p key={`${title}-${index}`}>{line}</p>
          ))}
        </div>
      ) : (
        <div className="showroom-subpanel mt-5 px-4 py-4">
          <p className="text-sm leading-7 text-white/56">
            No address snapshot was captured for this section yet.
          </p>
        </div>
      )}
    </section>
  );
}
