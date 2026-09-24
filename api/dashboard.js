export default async function handler(req, res) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`
  };

  const today = new Date();
  const end = new Date();
  end.setDate(today.getDate() + 30);

  const oggi = today.toISOString().slice(0, 10);
  const fine = end.toISOString().slice(0, 10);

  try {

    const [jobs, rev, due, app] = await Promise.all([

      fetch(
        `${url}/rest/v1/jobs?stato=eq.APERTO&select=id`,
        { headers }
      ),

      fetch(
        `${url}/rest/v1/vehicles?revisione=gte.${oggi}&revisione=lte.${fine}&select=id`,
        { headers }
      ),

      fetch(
        `${url}/rest/v1/payments_due?pagata=eq.false&select=id`,
        { headers }
      ),

      fetch(
        `${url}/rest/v1/appointments?data_ora=gte.${oggi}T00:00:00&data_ora=lte.${oggi}T23:59:59&select=id`,
        { headers }
      )

    ]);

    const result = {
      lavori: (await jobs.json()).length,
      revisioni: (await rev.json()).length,
      solleciti: (await due.json()).length,
      agenda: (await app.json()).length
    };

    res.status(200).json(result);

  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}