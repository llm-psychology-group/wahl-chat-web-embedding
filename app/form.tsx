import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const BASE_URL = 'https://wahl.chat';

export default function Form() {
  const params = useSearchParams();
  const router = useRouter();

  const partyIds = params.getAll('party_id');
  const tenantId = params.get('tenant_id');

  const link = useMemo(() => {
    const url = new URL(`${BASE_URL}/api/embed`);

    if (partyIds.length > 0) {
      partyIds.forEach((id) => {
        if (!id) return;
        url.searchParams.append('party_id', id);
      });
    }

    if (tenantId) {
      url.searchParams.append('tenant_id', tenantId);
    }

    return url.toString();
  }, [partyIds, tenantId]);

  const handlePartyIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPartyIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    updateQueryParams({ newPartyIds: selectedPartyIds });
  };

  const handleTenantIdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const tenantId = formData.get('tenantId') as string;
    updateQueryParams({ newTenantId: tenantId });
  };

  const updateQueryParams = ({
    newPartyIds,
    newTenantId,
  }: {
    newPartyIds?: string[];
    newTenantId?: string;
  }) => {
    const params = new URLSearchParams();

    const normalizedPartyIds = newPartyIds ?? partyIds;
    const normalizedTenantId = newTenantId ?? tenantId;

    if (normalizedPartyIds) {
      normalizedPartyIds.forEach((id) => {
        params.append('party_id', id);
      });
    }

    if (normalizedTenantId) {
      params.append('tenant_id', normalizedTenantId);
    }

    router.replace(`?${params.toString()}`);
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
    <>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="partyId" className="text-sm font-bold">
            Party ID - Wähle bis zu 3 Parteien aus
          </label>
          <select
            id="partyId"
            className="border-2 border-gray-300 rounded-lg p-2 w-fit"
            value={partyIds}
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
              defaultValue={tenantId ?? ''}
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
    </>
  );
}
