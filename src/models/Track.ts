import axios from './../axios'

export default class Track {

	/**
	 * Display a listing of the resource
	 *
	 * @param {object} albumId
	 * @return {Promise} 
	 */
	public static async index({ albumId }) {
		const response = await axios.get(`albums/${albumId}/tracks`)
		return response.data.tracks
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  {object} albumId, title, length
	 * @return {Promise} 
	 */
	public static async store({ albumId, title, length }) {
		const response = await axios.post(`albums/${albumId}/tracks`, {
			title,
			length,
		})
		return response.data.track
	}

	/**
	 * Display the specified resource.
	 * 
	 * @param  {object} albumId, id
	 * @return {Promise} 
	 */
	public static async show({ albumId, id }) {
		const response = await axios.get(`albums/${albumId}/tracks/${id}`)
		return response.data.track
	}

	/**
	 * Update the specified resource in storage.
	 * 
	 * @param {object} albumId, id, title, length
	 * @return {object}
	 */
	public static async update({ albumId, id, title, length }) {
		const response = await axios.post(`albums/${albumId}/tracks/${id}`, {
			title,
			length,
			_method: 'put',
		})
		return response.data.track
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param {object} albumId, id
	 * @return {Promise} 
	 */
	public static async destroy({ albumId, id }) {
		const response = await axios.post(`albums/${albumId}/tracks/${id}`, {
			_method: 'delete',
		})
		return response.data
	}
}