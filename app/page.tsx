'use client';

import { useMemo, useState } from 'react';

// const BASE_URL = 'https://wahl.chat';
const BASE_URL = 'https://wahl.chat';

export default function Home() {
  const [partyId, setPartyId] = useState<string[]>([]);
  const [tenantId, setTenantId] = useState<string>('');

  const link = useMemo(() => {
    const url = new URL(`${BASE_URL}/api/embed`);

    if (partyId.length > 0) {
      partyId.forEach((id) => {
        if (!id) return;
        url.searchParams.append('party_id', id);
      });
    }

    if (tenantId) {
      url.searchParams.append('tenant_id', tenantId);
    }

    return url.toString();
  }, [partyId, tenantId]);

  const handlePartyIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPartyIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setPartyId(selectedPartyIds);
  };

  const handleTenantIdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const tenantId = formData.get('tenantId') as string;
    setTenantId(tenantId);
  };

  const parties = {
    spd: 'SPD',
    afd: 'AfD',
    cdu: 'CDU',
    gruene: 'Grüne',
    volt: 'Volt',
    linke: 'Linke',
    bsw: 'BSW',
    fdp: 'FDP',
    '': 'wahl.chat',
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold">
        Implement wahl.chat on your website
      </h1>

      <div className="flex flex-row gap-4 mt-6">
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="partyId" className="text-sm font-bold">
            Party ID - Wähle bis zu 3 Parteien aus
          </label>
          <select
            id="partyId"
            className="border-2 border-gray-300 rounded-lg p-2 w-fit"
            value={partyId}
            onChange={handlePartyIdChange}
            multiple
          >
            {Object.entries(parties).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <form
          onSubmit={handleTenantIdSubmit}
          className="flex flex-col gap-2 mt-6"
        >
          <label htmlFor="tenantId" className="text-sm font-bold">
            Tenant ID - Wähle eine Partei aus
          </label>
          <div className="flex gap-2">
            <input
              id="tenantId"
              className="border-2 border-gray-300 rounded-lg p-2 w-fit"
              placeholder="Tenant ID"
              name="tenantId"
            />

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              type="submit"
            >
              Set Tenant ID
            </button>
          </div>
        </form>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        iFrame URL: <code className="text-sm text-gray-700">{link}</code>
      </p>

      <div className="flex gap-2 py-4 grow flex-wrap md:flex-nowrap">
        <div className="hidden md:block grow border-2 border-gray-300 rounded-lg overflow-hidden mx-auto mt-6">
          <iframe src={link} style={{ border: 'none' }} className="size-full" />
        </div>
        <div className="aspect-[9/19.5] border-2 border-gray-300 rounded-lg overflow-hidden mx-auto mt-6">
          <iframe src={link} style={{ border: 'none' }} className="size-full" />
        </div>
      </div>
    </div>
  );
}
