'use client';

import { useState } from 'react';

export default function Home() {
  const [partyId, setPartyId] = useState('afd');

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold">
        Implement wahl.chat on your website
      </h1>

      <p className="text-sm text-gray-500">
        wahl.chat is a chat widget that allows you to chat with your customers
        on your website.
      </p>

      <div className="aspect-[9/19.5] w-full border-2 border-gray-300 rounded-lg overflow-hidden mx-auto mt-6">
        <iframe
          src={`https://wahl.chat/session?party_id=${partyId}`}
          style={{ border: 'none' }}
          className="size-full"
        />
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <label htmlFor="partyId" className="text-sm font-bold">
          Party ID
        </label>
        <select
          id="partyId"
          className="border-2 border-gray-300 rounded-lg p-2"
          value={partyId}
          onChange={(e) => setPartyId(e.target.value)}
        >
          <option value="spd">SPD</option>
          <option value="afd">AfD</option>
          <option value="cdu">CDU</option>
          <option value="gruene">Grüne</option>
          <option value="volt">Volt</option>
          <option value="linke">Linke</option>
          <option value="bsw">BSW</option>
        </select>
      </div>
    </div>
  );
}
